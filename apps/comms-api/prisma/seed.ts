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
  await prisma.message.createMany({
    data: [
      {
        author: 1,
        message: 'hey emily!',
        receiver: 2,
      },
      {
        author: 2,
        message: 'good to hear from you dan!',
        receiver: 1,
      },
    ],
  });
}

main();
