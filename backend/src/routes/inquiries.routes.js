import { Router } from 'express';
import { prisma } from '../lib/prisma.js';
import { requireAuth, requireAdmin } from '../middleware/auth.js';

const router = Router();

router.post('/', async (req, res) => {
  const { name, contact, message } = req.body;
  if (!name || !contact || !message) {
    return res.status(400).json({ error: 'Name, contact and message are required.' });
  }
  const inquiry = await prisma.inquiry.create({ data: { name, contact, message } });
  res.status(201).json({ inquiry });
});

router.get('/', requireAuth, requireAdmin, async (req, res) => {
  const inquiries = await prisma.inquiry.findMany({ orderBy: { createdAt: 'desc' } });
  res.json({ inquiries });
});

router.patch('/:id/status', requireAuth, requireAdmin, async (req, res) => {
  const inquiry = await prisma.inquiry.update({
    where: { id: Number(req.params.id) },
    data: { status: req.body.status },
  });
  res.json({ inquiry });
});

export default router;
