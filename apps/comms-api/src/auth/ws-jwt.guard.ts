import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { verify } from 'jsonwebtoken';
import env from 'src/env/env';

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): any {
    if (context.getType() !== 'ws') {
      return true;
    }
    const client: Socket = context.switchToWs().getClient();
    const headers = client.handshake.headers;
    const payload = verify(
      headers.authorization.split('Bearer ')[1],
      env.jwtSecret,
      { ignoreExpiration: true },
    );
    // might use this....
    // context.switchToWs().getData().user = payload;
    return payload;
  }
}
