# Authentication

`auth/login` - Endpoint to login with user/name password.
`auth/profile` - Endpoint to get user details with the issued JWT

## Guards & Strategies

This doc shows an example of how `passport` and `nestjs` fit together to accomplish the basic auth flow. In the code we also show how to put `local`, `jwt` and `public` endpoints together with various guards and strategies.

### Create Invocable Guard

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

The `LoginResponseDto` data should return the JWT that will
be used in the JWT Strategy.

### Setup JWT and Role Guard

Firstly, we can use PassportJs to automatically handle
the standard Authorization header on our HTTP Requests.

```ts
// auth.module.ts
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
@Module({
  imports: [
    PassportModule,
    // This was already setup for when we login the user
    // and want to return the JWT the first time.
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  providers: [JwtStrategy], // this is new
})

// JwtStrategy.ts
import { ExtractJwt, Strategy } from 'passport-jwt';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({ 
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
     });
  }
  async validate(payload: TokenPayload): Promise<RequestUser> {}
}
```

The `JwtModule` was already setup when we returned the jwt
token on user login.  Here we add `JwtStrategy` for
validation and custom logic for setting the `req.user`
field.

Next, we need to tell the app when to invoke this logic.

```ts
// app.module.ts
@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ]
})

// jwt-auth.guard.ts
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  canActivate(context: ExecutionContext): any {
    return super.canActivate(context);
  }

  handleRequest(
    err: any,
    user: any,
    _info: any,
    _context: ExecutionContext,
    _status?: any,
  ) {
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}
```

The `JwtAuthGuard` is setup to apply to every route across
our application. It passes on the `canActivate`
responsibility to `AuthGuard('jwt')` which does the work of
validating the JWT and then calls `handleRequest` when
finished. As you can see, we handle the error or success.

This completes the authentication part of the logic. Next
we want to implement the authorization piece with a Role
Guard.  Technically we can allow public routes with a custom
`canActivate` method here, omitted for brevity.

### Role Guard

```ts
// app.module.ts
@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: RoleGuard,
    },
  ]
})

// role.guard.ts
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { SET_ROLES_KEY } from './role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const expectedRoles = this.reflector.getAllAndOverride<Role[]>(
      SET_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!expectedRoles) return true;

    type UserRequest = {
      user: RequestUser;
      params: { id: string };
    };
    const { params, user } = context.switchToHttp().getRequest() as UserRequest;

    // if user contains required role
    const containsOneRole =
      expectedRoles
        .map((expectedRole) => {
          return user.roles.includes(expectedRole);
        })
        .filter((el) => el).length > 0;

    if (containsOneRole) return true;

    return false;
  }
}
```

Here setup the Guard to be invoked on every route. So we
first check if the route has `expectedRoles` defined, and if
not we ignore the rest of the guard logic by returning true.

We use the NextJs Reflector to check the roles on the route,
more on this in a minute. We can then get the  `req.user`
object using `context.switchToHttp().getRequest()` and
validate the roles we expect.

So how do we get the Role data in the Reflector? With a role
decorator.

```ts
// profile.controller.ts
@Controller('users')
export class ProfileController {
  @Post('/:id/profile')
  @SetRole(['ADMIN'])
  updateProfile(@Param() params: { id: number }) { }
}

// role.decorator.ts
import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const SET_ROLES_KEY = 'roles';
export const SetRole = (roles: Role[]) => {
  return SetMetadata(SET_ROLES_KEY, roles);
};
```

Here the magic is that the role decorator will decorate the
request context with a special key/value:
`SET_ROLES_KEY, roles`. It's important to pay attention to
types and keep them as clear as possible because NestJs
cannot automatically track types when set and accessed via
these methods.

## References

- <https://docs.nestjs.com/security/authentication>
