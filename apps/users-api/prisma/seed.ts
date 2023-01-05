import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
async function main() {
  const createDan = prisma.user.create({
    data: {
      email: 'dan@jemini.io',
      username: 'kingnebby',
      profile: { create: { bio: 'I do stuff and things' } },
    },
  });
  const createEm = prisma.user.create({
    data: {
      email: 'em@jemini.io',
      username: 'joywave',
      profile: { create: { bio: 'I do things and stuff' } },
    },
  });
  return Promise.all([createDan, createEm]);
}
main()
  .then(() => prisma.$disconnect())
  .catch((e) => {
    console.log(e);
    prisma.$disconnect();
  });
