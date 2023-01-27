import { Injectable, Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Message } from './dto/message';

@WebSocketGateway()
@Injectable()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('message')
  handleMessage(@MessageBody() payload: string): string {
    Logger.log('request', payload);
    return `ack: ${payload}`;
  }

  sendMessage(payload: Message) {
    this.server.emit('events', { name: 'new_message', payload });
  }
}
