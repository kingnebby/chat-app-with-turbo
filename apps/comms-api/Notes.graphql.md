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
