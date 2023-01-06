import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';

// by default the passport-jwt Strategy will register a 'jwt' hook, so then our jwt-auth.guard is implementing the hook.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  // builds the req.user field for our controllers
  async validate(payload: any) {
    return {
      userId: payload.sub,
      username: payload.username,
      roles: payload.roles,
    };
  }
}
