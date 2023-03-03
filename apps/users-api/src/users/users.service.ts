import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '.prisma/client';
import { UserType } from 'src/auth/dto/user.dto';
const prisma = new PrismaClient();

@Injectable()
export class UsersService {
  static createFake(): UsersService {
    return new UsersServiceFake();
  }
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

class UsersServiceFake implements UsersService {
  fakeUsers: User[] = [
    {
      email: 'email',
      id: 1,
      password: 'password',
      username: 'username',
      usersRoles: [],
    },
  ];

  async getUsers(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  async findOne(email: string): Promise<UserType> {
    return this.fakeUsers.find((user) => user.email === email);
  }
  async getPassword(email: string): Promise<string> {
    const user = this.fakeUsers.find((user) => user.email === email);
    if (user) {
      return user.password;
    }
    throw new Error('could not find user');
  }
}
