import { Injectable } from '@nestjs/common';
import Prisma, { User } from '.prisma/client';
import { UserType } from 'src/auth/dto/user.dto';
import { PrismaClientProvider } from './prisma-client.provider';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClientProvider) {}

  static createFake(config?: PrismaClientFakeConfig) {
    // return new UsersServiceFake();
    // const prisma = new PrismaFake();
    const fakeClient: any = new PrismaClientFake(config);
    return new UsersService(fakeClient);
  }

  async getUsers() {
    const allUsers = await this.prisma.user.findMany();
    return allUsers;
  }

  async findOne(email: string): Promise<UserType> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });
    return exclude(user, ['password']);
  }

  async getPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
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

export type PrismaClientFakeConfig = {
  users: Array<Partial<User>>;
};

class PrismaClientFake {
  constructor(
    private readonly config: PrismaClientFakeConfig = { users: [] },
  ) {}
  user = {
    findMany: async () => {
      return this.config.users;
    },
    // TODO: type query with Prisma
    findUnique: async (query: any) => {
      return this.config.users.find((el) => el.email === query.where.email);
    },
  };
}
