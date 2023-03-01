import { PrismaClient, User } from '.prisma/client';
import { Injectable } from '@nestjs/common';

export type UserModelFakeConfig = Array<Partial<User>>;
/**
 * This simply services to make the prisma client injectable like
 * any other service.
 */
@Injectable()
export class PrismaClientProvider extends PrismaClient {
  static createFake() {
    return <PrismaClient>(<unknown>new PrismaUsersClientFake());
  }
}

/**
 * Nullable Infrastructure === Fake Dependencies
 * This will end up looking very much like an in memory db
 * implementation.
 */
type PrismaUserDAO = typeof PrismaClient.prototype.user;
class PrismaUsersClientFake extends PrismaClientProvider {
  // TODO: should we allow for fake data per method in the config?
  constructor(private readonly data: Partial<User[]> = []) {
    super();
  }

  get user(): PrismaUserDAO {
    const thing: unknown = <Partial<PrismaUserDAO>>{
      findMany(_query) {
        return this.data;
      },
      findUnique: async (query) => {
        return this.data.find((el) => el.email === query.where.email);
      },
    };

    return <PrismaUserDAO>thing;
  }
}
