import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MessagesModule } from './messages/messages.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { WsJwtAuthGuard } from './auth/ws-jwt.guard';

@Module({
  imports: [MessagesModule],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: WsJwtAuthGuard,
    },
  ],
})
export class AppModule {}
