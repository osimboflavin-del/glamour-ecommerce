import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

// POST /api/orders  { customerName, phone, address, paymentMethod, items:[{productId, quantity}] }
// Works for logged-in users (req.user set) and guests (no auth header needed on this route).
router.post('/', async (req, res) => {
  const { customerName, phone, address, paymentMethod, items } = req.body;
  if (!customerName || !phone || !address || !items?.length) {
    return res.status(400).json({ error: 'Missing required checkout details.' });
  }

  // Recompute totals server-side from real DB prices — never trust client-sent prices.
  const productIds = items.map((i) => Number(i.productId));
  const products = await prisma.product.findMany({ where: { id: { in: productIds } } });
  const productMap = Object.fromEntries(products.map((p) => [p.id, p]));

  let total = 0;
  const orderItemsData = [];
  for (const item of items) {
    const product = productMap[Number(item.productId)];
    if (!product) return res.status(400).json({ error: `Product ${item.productId} not found.` });
    if (product.stock < item.quantity) {
      return res.status(400).json({ error: `${product.name} only has ${product.stock} in stock.` });
    }
    total += product.price * item.quantity;
    orderItemsData.push({ productId: product.id, quantity: item.quantity, priceAtSale: product.price });
  }

  // Try to read a logged-in user from the access token, but don't require it (guest checkout).
  let userId = null;
  const header = req.headers.authorization || '';
  if (header.startsWith('Bearer ')) {
    try {
      const { verifyAccessToken } = await import('../lib/jwt.js');
      userId = verifyAccessToken(header.slice(7)).sub;
    } catch { /* guest checkout — ignore invalid/missing token */ }
  }

  const order = await prisma.$transaction(async (tx) => {
    const created = await tx.order.create({
      data: {
        userId, customerName, phone, address, paymentMethod, total,
        items: { create: orderItemsData },
      },
      include: { items: { include: { product: true } } },
    });
    for (const item of orderItemsData) {
      await tx.product.update({ where: { id: item.productId }, data: { stock: { decrement: item.quantity } } });
    }
    return created;
  });

  res.status(201).json({ order });
});

router.get('/my', requireAuth, async (req, res) => {
  const orders = await prisma.order.findMany({
    where: { userId: req.user.sub },
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ orders });
});

router.get('/', requireAuth, requireAdmin, async (req, res) => {
  const orders = await prisma.order.findMany({
    include: { items: { include: { product: true } } },
    orderBy: { createdAt: 'desc' },
  });
  res.json({ orders });
});

router.patch('/:id/status', requireAuth, requireAdmin, async (req, res) => {
  const { status } = req.body;
  const order = await prisma.order.update({ where: { id: Number(req.params.id) }, data: { status } });
  res.json({ order });
});

export default router;
