import { PrismaClient } from '.prisma/client';
import { Injectable } from '@nestjs/common';

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
