import { PrismaClient, Prisma } from '@prisma/client';

const prisma = new PrismaClient();

const userData: Prisma.UserCreateInput[] = [
  {
    id: 1,
    name: 'Alice',
    rank: 10,
  },
  {
    id: 2,
    name: 'Bob',
    rank: 5,
  },
  {
    id: 3,
    name: 'Chris',
    rank: 7,
  },
  {
    id: 4,
    name: 'Danny',
    rank: 12,
  },
  {
    id: 5,
    name: '秀吉',
    rank: 1001,
  },
];

async function main(): Promise<void> {
  console.log(`Start seeding ...`);
  for (const u of userData) {
    const user = await prisma.user.create({
      data: u,
    });
    console.log(`Created user with id: ${user.id}`);
  }
  console.log(`Seeding finished.`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
