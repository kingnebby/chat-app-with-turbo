import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/user.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(email: string, password: string): Promise<UserDTO> {
    try {
      return await this.authService.validateUser(email, password);
    } catch (error) {
      Logger.error(error, 'could not validate user');
      throw new UnauthorizedException({
        cause: error,
        description: 'ensure your token is valid',
      });
    }
  }
}
