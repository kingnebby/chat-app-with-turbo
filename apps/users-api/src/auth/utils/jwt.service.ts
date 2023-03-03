// lib/jwt/jwt.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService as _JwtService, JwtSignOptions } from '@nestjs/jwt';

// add to providers?
@Injectable()
export class JwtService extends _JwtService {
  static createFake() {
    return new JwtServiceFake();
  }
}

class JwtServiceFake extends JwtService {
  sign(_payload: string | object | Buffer, _options?: JwtSignOptions): string {
    return 'jwt-token';
  }
}
