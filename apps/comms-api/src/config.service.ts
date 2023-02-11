import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { verify } from 'jsonwebtoken';

@Injectable()
export class ChatConfigService {
  constructor(private configService: ConfigService) {}

  isValidAuthHeader(authorization: string) {
    const token: string = authorization.split(' ')[1];
    const payload = verify(token, this.configService.get('JWT_SECRET_KEY'), {
      ignoreExpiration: true,
    });
    return payload;
  }
}
