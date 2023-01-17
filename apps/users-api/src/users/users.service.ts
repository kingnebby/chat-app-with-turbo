import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import { UserDTO, UserType } from 'src/auth/dto/user.dto';
const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  async getUsers() {
    const allUsers = await prisma.user.findMany();
    return allUsers;
  }

  async findOne(email: string): Promise<UserType> {
    const user = await prisma.user.findUnique({
      where: { email: email },
    });
    return exclude(user, ['password']);
  }

  async getPassword(email: string) {
    const user = await prisma.user.findUnique({ where: { email: email } });
    return user.password;
  }
}

// TODO: make a generic utility
function exclude<T, Key extends keyof T>(object: T, keys: Key[]): Omit<T, Key> {
  for (const key of keys) {
    delete object[key];
  }
  return object;
}
