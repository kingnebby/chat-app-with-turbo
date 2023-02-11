import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Socket } from 'socket.io';
import { ChatConfigService } from 'src/config.service';

@Injectable()
export class WsJwtAuthGuard implements CanActivate {
  constructor(private envService: ChatConfigService) {}
  canActivate(context: ExecutionContext): any {
    if (context.getType() !== 'ws') {
      return true;
    }

    const client = context.switchToWs().getClient<Socket>();
    const { authorization } = client.handshake.headers;
    const payload = this.envService.isValidAuthHeader(authorization);

    // Logger.log({ payload });
    // context.switchToWs().getData().user = payload;
    return payload;
  }
}
