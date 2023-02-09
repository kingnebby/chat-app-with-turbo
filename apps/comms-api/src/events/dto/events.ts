import { Message } from './message';

export const EVENT_NAME = 'events';

export enum EventType {
  NEW_MESSAGE,
}

export class NewMessageEvent {
  eventType: EventType.NEW_MESSAGE;
  payload: Message;
}
