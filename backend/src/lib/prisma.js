import { PrismaClient } from '@prisma/client';

// Reuse a single PrismaClient instance across the app (and across
// hot-reloads in dev) instead of opening a new DB connection per request.
export const prisma = new PrismaClient();
