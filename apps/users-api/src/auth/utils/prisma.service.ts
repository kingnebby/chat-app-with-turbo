import { PrismaClient, User } from '.prisma/client';
import { Injectable } from '@nestjs/common';

// export type UserModelFakeConfig = Array<Partial<User>>;
@Injectable()
export class PrismaClientProvider extends PrismaClient {
  static createFake(): PrismaClientProvider {
    return <PrismaClientProvider>(<unknown>new PrismaUsersClientFake());
  }
}

class PrismaUsersClientFake implements Partial<PrismaClientProvider> {
  data: Partial<User[]> = [
    {
      email: 'email',
      id: 1,
      password: 'password',
      username: 'username',
      usersRoles: [],
    },
  ];

  get user() {
    const userModel: unknown = <Partial<PrismaUserDAO>>{
      findMany(_query) {
        return this.data;
      },
      findUnique: async (query) => {
        const data = this.data.find((el) => el.email === query.where.email);
        if (data) {
          return data;
        }
        throw new Error('could not find user');
      },
    };

    return <PrismaUserDAO>userModel;
  }
}

type PrismaUserDAO = typeof PrismaClient.prototype.user;
