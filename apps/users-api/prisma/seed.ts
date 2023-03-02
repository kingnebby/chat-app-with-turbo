import { PrismaClient } from '.prisma/client';
import { SaltService } from '../src/auth/salt.service';
const prisma = new PrismaClient();
async function main() {
  // create
  const saltService = new SaltService();
  const createDan = prisma.user.create({
    data: {
      email: 'dan@jemini.io',
      username: 'kingnebby',
      password: await saltService.hashPassword('password'),
      profile: { create: { bio: 'I do stuff and things' } },
      usersRoles: ['USER'],
    },
  });
  const createEm = prisma.user.create({
    data: {
      email: 'em@jemini.io',
      username: 'joywave',
      password: await saltService.hashPassword('password'),
      profile: { create: { bio: 'I do things and stuff' } },
      usersRoles: ['ADMIN', 'USER'],
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
