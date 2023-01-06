import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserDTO } from 'src/auth/dto/user.dto';
const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async getUsers() {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  }

  async findOne(email: string): Promise<UserDTO> {
    const user = await prisma.user.findUnique({ where: { email: email } });
    return {
      email: user.email,
      username: user.username,
      id: user.id,
    };
  }

  async getPassword(email: string) {
    const user = await prisma.user.findUnique({ where: { email: email } });
    return user.password;
  }
}
