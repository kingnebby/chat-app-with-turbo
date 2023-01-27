# Add Websockets to Chat App

## Setup

```sh
cd apps/comms-api
pnpm i --save @nestjs/websockets @nestjs/platform-socket.io socket.io
nest g mo events
nest g ga events
```

- Generates a gateway class.
- It will already have the websocket annotations you need.
- Will update the `app.module.ts`

## Create the Gateway

```ts
// src/events/events.gateway.ts
@WebSocketGateway()
@Injectable()
export class EventsGateway {
  @WebSocketServer()
  server: Server;

  // used for handling messages sent to server
  @SubscribeMessage('message')
  handleMessage(@MessageBody() payload: string): string {
    return `ack: ${payload}`;
  }

  // used for internal servers sending messages
  sendMessage(payload: Message) {
    this.server.emit('events', { name: 'new_message', payload });
  }
}
```

```ts
// src/events/dto/message.ts
export class Message {
  id: string;
  message: string;
  authorId: string;
  conversationId: string;
}
```

### Postman Validation

I want to test this in the simplest form before moving on.

- Add New Request
- Change type
- Enter root url of server `{msg-api}` and connect
- Check the box `ack`
- Add your message and click send.

## Use the Gateway in Messages CRUD

```ts
// src/messages/messages.module.ts
@Module({
  imports: [EventsModule]
})
```

```ts
// src/messages/messages.service.ts
export class MessagesService {
  constructor(private eventsGateway: EventsGateway) {}
  async create(createMessageDto: CreateMessageDto) {
    const result = await prisma.message.create(/*...*/)
    this.eventsGateway.sendMessage(result)
    return result 
  }
```

- Export/Import the `EventsGateway` in the Nest Modules
- Call the Gateway when a new message is created.

### Validation with Postman

- Add a new event listener for `events`
- Use findAll() to see users and messages there now
- Create a message and see the event
