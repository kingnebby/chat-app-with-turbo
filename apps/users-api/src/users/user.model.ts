import { Injectable } from '@nestjs/common';
import { PrismaClientProvider } from '../lib/prisma/prisma-client.provider';
import { User } from '.prisma/client';
import { PublicMembersOf } from '../auth/types.utils';

@Injectable()
export class UserModel {
  constructor(private readonly prisma: PrismaClientProvider) {}

  static createFake(config?: Partial<User>[]): UserModel {
    return <UserModel>(<unknown>new UserModelFake(config));
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

class UserModelFake implements PublicMembersOf<UserModel> {
  constructor(private readonly config?: Partial<User>[]) {}
  /**
   * @returns all items
   */
  async findMany() {
    return <User[]>this.config;
  }
  /**
   * @returns returns the first element always
   */
  async findUniqueByEmail() {
    return <User>this.config[0];
  }

  async getPassword(_email: string) {
    return 'password';
  }
}
