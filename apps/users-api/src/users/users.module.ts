import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ProfileController } from './profile.controller';
import { PrismaClientProvider } from './prisma-client.provider';

@Module({
  controllers: [UsersController, ProfileController],
  providers: [PrismaClientProvider, UsersService],
  exports: [UsersService],
})
export class UsersModule {}
