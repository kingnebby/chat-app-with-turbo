import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      {
        userId: 1,
      },
      {
        userId: 2,
      },
    ],
  });
}

main();
