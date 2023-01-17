import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { jwtConstants } from './constants';
import { RequestUser } from './dto/request-user';
import { TokenPayload } from './dto/token.dto';

// by default the passport-jwt Strategy will register a 'jwt' hook, so then our jwt-auth.guard is implementing the hook.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: true,
      secretOrKey: jwtConstants.secret,
    });
  }

  // builds the req.user field for our controllers
  async validate(payload: TokenPayload): Promise<RequestUser> {
    return {
      email: payload.email,
      userId: payload.sub,
      username: payload.username,
      roles: payload.roles,
    };
  }
}
