import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { UsersController } from './profile/users/users.controller';

@Module({
  imports: [UsersModule, AuthModule],
  controllers: [UsersController],
  providers: [],
})
export class AppModule {}
