import { Injectable } from '@nestjs/common';
import { PrismaClientProvider } from './prisma-client.provider';
import { User } from '.prisma/client';

@Injectable()
export class UserModel {
  constructor(private readonly prisma: PrismaClientProvider) {}

  static createFake(config?: UserModelFakeConfig) {
    const fakeClient: any = new PrismaClientFake(config);
    return new UserModel(fakeClient);
  }

  async findMany() {
    const allUsers = await this.prisma.user.findMany();
    // TODO: ensure password is redacted

    return allUsers;
  }

  async findUniqueByEmail(email: string): Promise<User> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });
    return user;
  }
}

// Nullable Infrastructure === Fake Dependencies
export type UserModelFakeConfig = Array<Partial<User>>;
class PrismaClientFake {
  // TODO: should we allow for fake data per method in the config?
  constructor(private readonly data: UserModelFakeConfig = []) {}

  user = {
    findMany: async () => {
      return this.data;
    },
    // TODO: type query with Prisma
    findUnique: async (query: any) => {
      return this.data.find((el) => el.email === query.where.email);
    },
  };
}
