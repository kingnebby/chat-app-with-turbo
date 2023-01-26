# Generate a REST API

```sh
nest g resource messages
```

Failed due to pnpm manager.

```sh
pnpm i
```

```ts
// src/messages/messages.service.ts
import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();

//...
 findAll() {
    return prisma.message.findMany();
  }
```

```ts
// messages/entities/messages.entity.ts

// filled out to match prisma
```

Fill out the details of the generated resource

```http
GET {{msg-api}}/messages
```
