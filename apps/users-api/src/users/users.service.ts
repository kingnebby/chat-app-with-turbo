import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async getUsers() {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  }

  async findOne(email: string) {
    const user = await prisma.user.findUnique({ where: { email: email } });
    return user;
  }
}
