import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

// GET /api/products?search=&category=&sort=low|high|promo
router.get('/', async (req, res) => {
  const { search, category, sort } = req.query;
  const where = {
    AND: [
      search ? { name: { contains: String(search) } } : {},
      category && category !== 'All' ? { category: String(category) } : {},
      sort === 'promo' ? { NOT: { oldPrice: null } } : {},
    ],
  };
  const orderBy =
    sort === 'low' ? { price: 'asc' } : sort === 'high' ? { price: 'desc' } : { createdAt: 'desc' };

  const products = await prisma.product.findMany({ where, orderBy });
  res.json({ products });
});

router.get('/categories', async (req, res) => {
  const rows = await prisma.product.findMany({ select: { category: true }, distinct: ['category'] });
  res.json({ categories: rows.map((r) => r.category) });
});

router.get('/:id', async (req, res) => {
  const product = await prisma.product.findUnique({ where: { id: Number(req.params.id) } });
  if (!product) return res.status(404).json({ error: 'Product not found.' });
  res.json({ product });
});

router.post('/', requireAuth, requireAdmin, async (req, res) => {
  const { name, category, price, oldPrice, stock, description, color, imageUrl } = req.body;
  if (!name || !category || price == null) {
    return res.status(400).json({ error: 'Name, category and price are required.' });
  }
  const product = await prisma.product.create({
    data: { name, category, price: Number(price), oldPrice: oldPrice ? Number(oldPrice) : null,
      stock: Number(stock) || 0, description: description || '', color: color || '#5A1F52', imageUrl: imageUrl || '' },
  });
  res.status(201).json({ product });
});

router.put('/:id', requireAuth, requireAdmin, async (req, res) => {
  const id = Number(req.params.id);
  const { name, category, price, oldPrice, stock, description, color, imageUrl } = req.body;
  const product = await prisma.product.update({
    where: { id },
    data: { name, category, price: price != null ? Number(price) : undefined,
      oldPrice: oldPrice === '' ? null : oldPrice != null ? Number(oldPrice) : undefined,
      stock: stock != null ? Number(stock) : undefined, description, color, imageUrl },
  });
  res.json({ product });
});

router.delete('/:id', requireAuth, requireAdmin, async (req, res) => {
  await prisma.product.delete({ where: { id: Number(req.params.id) } });
  res.status(204).end();
});

export default router;
