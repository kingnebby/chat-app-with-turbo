import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserDTO> {
    try {
      return await this.authService.validateUser(username, password);
    } catch (error) {
      throw new UnauthorizedException({
        cause: error,
        description: 'ensure your token is valid',
      });
    }
  }
}
