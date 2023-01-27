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

## Secure Your Endpoints

NestJs doesn't have native support for securing Websockets.

```sh
pnpm i jsonwebtoken
pnpm i -D @types/jsonwebtoken
```

```ts
// src/auth/ws-jwt.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';
import env from 'src/env/env';

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): any {
    if (context.getType() !== 'ws') {
      return true;
    }
    const client: Socket = context.switchToWs().getClient();
    const headers = client.handshake.headers;
    const payload = verify(
      headers.authorization.split('Bearer ')[1],
      env.jwtSecret
    );
    // might use this....
    // context.switchToWs().getData().user = payload;
    return payload;
  }
}
```

- Use Nest's `context` to get headers.
- We use `jsonwebtoken` to do standard jwt `verify`.
- Ensure we don't process unless we're in the `ws` context.

```ts
// src/app.module.ts
@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: WsJwtAuthGuard,
    },
  ],
})
export class AppModule {}
```

- This will apply the guard to all Web Socket endpoints.

Validate with the same Postman flow as before.
