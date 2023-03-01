import { Injectable } from '@nestjs/common';
import { JwtService as _JwtService, JwtSignOptions } from '@nestjs/jwt';

@Injectable()
export class JwtService extends _JwtService {
  static createFake() {
    return new JwtServiceFake();
  }
}

class JwtServiceFake extends JwtService {
  sign(payload: string | object | Buffer, _options?: JwtSignOptions): string {
    return `fake: ${payload.toString()}`;
  }
}
