# Comms API

## Adding this Package

```bash
cd apps/
nest g application comms-api
```

Create the nest application with the nest application
generator.
Note that the `nest g app` does not work as it makes
assumptions on which monorepo tech you're using.

```json
{
  "scripts": {
    "dev": "nest start --watch --preserveWatchOutput",
  }
}
```

Add the `dev` script to `package.json`

### Add Prisma+Mongo

```dockerfile
# mongo_rs/dockerfile
# https://github.com/prisma/prisma/tree/main/docker
FROM mongo

# we take over the default & start mongo in replica set mode in a background task
ENTRYPOINT mongod --port $MONGO_REPLICA_PORT --replSet rs0 --bind_ip 0.0.0.0 & MONGOD_PID=$!; \
# we prepare the replica set with a single node and prepare the root user config
INIT_REPL_CMD="rs.initiate({ _id: 'rs0', members: [{ _id: 0, host: '$MONGO_REPLICA_HOST:$MONGO_REPLICA_PORT' }] })"; \
INIT_USER_CMD="db.getUser('$MONGO_INITDB_ROOT_USERNAME') || db.createUser({ user: '$MONGO_INITDB_ROOT_USERNAME', pwd: '$MONGO_INITDB_ROOT_PASSWORD', roles: [ 'root' ] })"; \
# we wait for the replica set to be ready and then submit the commands just above
until (mongo admin --port $MONGO_REPLICA_PORT --eval "$INIT_REPL_CMD && $INIT_USER_CMD"); do sleep 1; done; \
# we are done but we keep the container by waiting on signals from the mongo task
echo "REPLICA SET ONLINE"; wait $MONGOD_PID;
```

- Prisma requires transactions which are only available in Mongo Replica Sets.
- Use the dockerfile to build a single replica mongo instance.
- Ensures a default admin user is in the database.

```yml
# {root}/docker-compose.yml
mongo:
    image: mongo
    build: ./mongo_rs
    restart: always
    environment:
      MONGO_INITDB_ROOT_USERNAME: mongo
      MONGO_INITDB_ROOT_PASSWORD: example
      MONGO_INITDB_DATABASE: mongo
      MONGO_REPLICA_HOST: localhost
      MONGO_REPLICA_PORT: 27017
    ports:
      - '27017:27017'
```

- Add the mongo database image details to your docker-compose

```bash
pnpm i prisma && pnpm i -D @prisma/client
npx prisma init

# .env
DATABASE_URL="mongodb://mongo:example@localhost:27017/mongo?authSource=admin"
```

- Mongo requires that you auth to `admin` but use a separate db.

```prisma
// {project}/prisma/schema.prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

model User {
  id              String         @id @default(auto()) @map("_id") @db.ObjectId
  createdAt       DateTime       @default(now())
  updatedAt       DateTime       @updatedAt
  // Foreign key to the Users API Postgres DB
  userId          BigInt         @unique
  Conversations   Conversation[] @relation(fields: [conversationIds], references: [id])
  conversationIds String[]       @db.ObjectId
  Messages        Message[]
}

model Message {
  id             String       @id @default(auto()) @map("_id") @db.ObjectId
  message        String
  createdAt      DateTime     @default(now())
  updatedAt      DateTime     @updatedAt
  Author         User         @relation(fields: [authorId], references: [id])
  authorId       String       @db.ObjectId
  Conversation   Conversation @relation(fields: [conversationId], references: [id])
  conversationId String       @db.ObjectId
}

model Conversation {
  id              String    @id @default(auto()) @map("_id") @db.ObjectId
  Messages        Message[]
  Participants    User[]    @relation(fields: [participantsIds], references: [id])
  participantsIds String[]  @db.ObjectId
}
```

- Since we're using `pnpm` workspaces with multiple instances of prisma, you need
to tell prisma to generate locally with the `output` configuration.
- Add your db models.
- Run `npx prisma db push --force-reset` to drop db and redeploy the schema

```ts
import { PrismaClient } from '.prisma/client';
const prisma = new PrismaClient();

async function main() {
  const userDan = await prisma.user.create({ data: { userId: 1 } });
  const userEmily = await prisma.user.create({ data: { userId: 2 } });

  const conversation = await prisma.conversation.create({
    data: {
      Participants: { connect: [{ id: userDan.id }, { id: userEmily.id }] },
    },
  });

  await prisma.message.createMany({
    data: [
      {
        message: 'hey emily!',
        authorId: userDan.id,
        conversationId: conversation.id,
      },
      {
        message: 'good to hear from you dan!',
        authorId: userEmily.id,
        conversationId: conversation.id,
      },
    ],
  });
}

main();
```

- Create the seed script.
- Run with `npx prisma db seed`.
- This is hardcoded to match the `apps/users-api` seed where it should
create two users each with id's 1 and 2 respectively.

```bash
docker-compose exec mongo mongo -u mongo -p example
rs0:PRIMARY> use mongo;
rs0:PRIMARY> db.User.count()
2
```

You can validate the data by executing the mongo shell and checking the user collection count.

Or using prisma schema to see your data.

## TODO

[ ] The data is currently seeded assuming some hard coded user ids.
We'll use sagas later to ensure that when a new user is created a
new user in the comms-api is also created.
