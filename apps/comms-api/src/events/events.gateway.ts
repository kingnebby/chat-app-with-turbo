import { Injectable } from '@nestjs/common';
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
  // recommended to remove the reference to _client to make testing easier.
  handleMessage(_client: any, @MessageBody() payload: string): string {
    return `ack: ${payload}`;
  }

  sendMessage(payload: Message) {
    this.server.emit('events', { name: 'new_message', payload });
  }
}
