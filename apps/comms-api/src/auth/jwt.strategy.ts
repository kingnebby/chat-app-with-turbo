import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

// by default the passport-jwt Strategy will register a 'jwt' hook, so then our jwt-auth.guard is implementing the hook.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: configService.get<string>('JWT_SECRET_KEY'),
    });
  }

  // builds the req.user field for our controllers
  validate(payload: any) {
    return {
      email: payload.email,
      userId: payload.sub,
      username: payload.username,
      roles: payload.roles,
    };
  }
}
