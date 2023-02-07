# Adding Graphql

## Add Basic Support

```sh
npm i @nestjs/graphql @nestjs/apollo graphql apollo-server-express
```

Note: Technically, apollo-server-express is v3 which has been deprecated, but the nestjs libs have not upgraded to use apollo v4.

```ts
// src/app.module.ts
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
    }),
  ],
})
export class AppModule {}
```

1. Create graphql/model file.
1. Create the resolver file.

Wiring into nestjs

1. Wire up the provider to the message module.

This should work. But here we run into auth blocking us.

1. Then we update our `AuthGuard('jwt')` to be an actual guard file and add the  `getRequest` method that the docs say to do.

## Add CLI to autogen stuff

```json
{
  "compilerOptions": {
    {
      "name": "@nestjs/graphql",
      "options": {
        "typeFileNameSuffix": [".input.ts", ".args.ts"],
        "introspectComments": true
      }
    }
  }
}
```

1. Then update your `.model.ts` file and save.

## Merge the Codez

Simply add the `@ObjectType` annotation to the existing entity.

```ts
export class MessageResolver {
  @Mutation(() => Message)
  async create(
    @Args('createMessage') newMessage: CreateMessageDto,
  ): Promise<Message> {
    return this.messageService.create(newMessage);
  }
}
```

1. create a `createMessage` resolver.
1. update the file to be `.input.ts` and the plugin should pick it up.

For update message, we have to use the `PartialType` from the graphql package and not the `mapped-types` package. See: `src/messages/dto/update-message.input.ts`
