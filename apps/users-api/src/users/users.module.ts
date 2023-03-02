import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ProfileController } from './profile.controller';
import { PrismaClientProvider } from '../lib/prisma/prisma-client.provider';
import { UserModel } from './user.model';

@Module({
  controllers: [UsersController, ProfileController],
  providers: [PrismaClientProvider, UsersService, UserModel],
  exports: [UsersService],
})
export class UsersModule {}
