import { Injectable, Logger, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { SocketAuthMiddleware } from 'src/auth/ws-auth.mw';
import { WsJwtAuthGuard } from 'src/auth/ws-jwt.guard';
import { ChatConfigService } from 'src/config.service';
import { EventType, EVENT_NAME, NewMessageEvent } from './dto/events';
import { Message } from './dto/message';

@WebSocketGateway({ namespace: 'events' })
@UseGuards(WsJwtAuthGuard)
@Injectable()
export class EventsGateway {
  constructor(private configService: ChatConfigService) {}

  @WebSocketServer()
  server: Server;

  afterInit(client: Socket) {
    client.use(SocketAuthMiddleware(this.configService) as any); // because types are broken
    Logger.log('afterInit');
  }

  @SubscribeMessage('message')
  handleMessage(@MessageBody() payload: string): string {
    Logger.log('request', payload);
    return `ack: ${payload}`;
  }

  sendNewMessage(message: Message) {
    const payload: NewMessageEvent = {
      eventType: EventType.NEW_MESSAGE,
      payload: message,
    };
    this.server.emit(EVENT_NAME, payload);
  }
}
