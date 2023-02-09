import { Injectable, Logger } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { EventType, EVENT_NAME, NewMessageEvent } from './dto/events';
import { Message } from './dto/message';

@WebSocketGateway({ namespace: 'events' })
@Injectable()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

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
