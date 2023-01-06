# Authentication

`auth/login` - Endpoint to login with user/name password.
`auth/profile` - Endpoint to get user details with the issued JWT

## Guards & Strategies

This doc shows an example of how `passport` and `nestjs` fit together to accomplish the basic auth flow. In the code we also show how to put `local`, `jwt` and `public` endpoints together with various guards and strategies.

### Create Invokable Guard

A guard is just a special type of decorator of the form: `IAuthGuard` from `@nestjs/passport`.

```ts
// Snippet from local-auth.guard.ts
import { AuthGuard } from '@nestjs/passport';
export class LocalAuthGuard extends AuthGuard('local') {}
```

This tells nestjs to support a Guard called `local`. But we need to implement that guard and then ensure it's invoked as part of the request handling pipeline.

### Define the Passport Strategy

Using the NestJs `PassportStrategy`, created from the `passport-local` gives us the opportunity to validate the credentials of a `local` authentication attempt, which always includes a username and password.

```ts
// snippet from local.strategy.ts
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
export class LocalStrategy extends PassportStrategy(Strategy) {
  async validate(username: string, password: string) {}
}
```

### Include in the Request Pipeline

```ts
// snippet from auth.module.ts
@Module({
  imports: [ PassportModule ],
  providers: [LocalStrategy], // ensures this strategy is available in the pipeline.
  controllers: [AuthController],
})
export class AuthModule {}
```

### Invoke the Guard on an Endpoint

```ts
// snippet from auth.controller.ts
@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(): Promise<LoginResponseDto> {}
```

## References

- <https://docs.nestjs.com/security/authentication>
