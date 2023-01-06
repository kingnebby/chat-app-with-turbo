import { PrismaClient } from '@prisma/client';
import { hashPassword } from '../src/auth/salt-password';
const prisma = new PrismaClient();
async function main() {
  // drop db
  // await prisma.$transaction([
  //   prisma.user.deleteMany(),
  //   prisma.profile.deleteMany(),
  // ]);

  // create
  const createDan = prisma.user.create({
    data: {
      email: 'dan@jemini.io',
      username: 'kingnebby',
      password: await hashPassword('password'),
      profile: { create: { bio: 'I do stuff and things' } },
    },
  });
  const createEm = prisma.user.create({
    data: {
      email: 'em@jemini.io',
      username: 'joywave',
      password: await hashPassword('password'),
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
