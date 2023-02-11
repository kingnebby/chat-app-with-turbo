import { Socket } from 'socket.io';
import { ChatConfigService } from 'src/config.service';

type SocketIOMiddleWare = {
  (client: Socket, next: (err?: Error) => void);
};

export const SocketAuthMiddleware = (
  configService: ChatConfigService,
): SocketIOMiddleWare => {
  return (client, next) => {
    try {
      const { authorization } = client.handshake.headers;
      configService.isValidAuthHeader(authorization);
      next();
    } catch (error) {
      next(error);
    }
  };
};
