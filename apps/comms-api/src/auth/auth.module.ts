import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [JwtStrategy],
})
export class AuthModule {}
