import { PrismaClient } from '.prisma/client';
import { Injectable } from '@nestjs/common';

/**
 * This simply services to make the prisma client injectable like
 * any other service.
 */
@Injectable()
export class PrismaClientProvider extends PrismaClient {
  // TODO: Should we fake here for some reason?
  // static createFake() {
  //   return new PrismaUsersClientFake() as PrismaClient;
  // }
  // user: any;
}

// @Injectable()
// class PrismaUsersClientFake {}
