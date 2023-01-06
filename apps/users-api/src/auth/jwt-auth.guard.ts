import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from './public.decorator';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  // Without the `any` type, I get this error:
  // The inferred type of 'canActivate' cannot be named without a reference to '.pnpm/rxjs@7.6.0/node_modules/rxjs'. This is likely not portable. A type annotation is necessary.
  canActivate(context: ExecutionContext): any {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
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
