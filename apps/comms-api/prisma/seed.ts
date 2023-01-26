import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();

async function main() {
  const userDan = await prisma.user.create({ data: { userId: 1 } });
  const userEmily = await prisma.user.create({ data: { userId: 2 } });

  const conversation = await prisma.conversation.create({
    data: {
      Participants: { connect: [{ id: userDan.id }, { id: userEmily.id }] },
    },
  });

  await prisma.message.createMany({
    data: [
      {
        message: 'hey emily!',
        authorId: userDan.id,
        conversationId: conversation.id,
      },
      {
        message: 'good to hear from you dan!',
        authorId: userEmily.id,
        conversationId: conversation.id,
      },
    ],
  });
}

main();
