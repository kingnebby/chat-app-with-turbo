import { Module } from '@nestjs/common';
import { ChatConfigService } from 'src/config.service';
import { JwtStrategy } from './jwt.strategy';

@Module({
  providers: [JwtStrategy, ChatConfigService],
})
export class AuthModule {}
