import { PrismaClient } from '@prisma/client';

export const prismaClient = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  // TODO: use env variable or|and ext source(such as secrets manager)
});
