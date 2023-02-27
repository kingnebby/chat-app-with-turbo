import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { TokenPayload } from './dto/token.dto';
import { UserDTO } from './dto/user.dto';
import { SaltService } from './salt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private saltService: SaltService,
  ) {}

  async validateUser(_email: string, pass: string): Promise<UserDTO> {
    const dbPassword = await this.usersService.getPassword(_email);
    if (await this.saltService.compare(pass, dbPassword)) {
      const { email, id, username, usersRoles } =
        await this.usersService.findOne(_email);
      return {
        email,
        id,
        username,
        roles: usersRoles,
      };
    }
    Logger.error({ email: _email }, 'passwords do not match');
    throw new Error('unable to validate user');
  }

  async login(user: UserDTO) {
    const payload: TokenPayload = {
      email: user.email,
      username: user.username,
      sub: user.id,
      roles: user.roles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}

export class JwtServiceFake extends JwtService {
  sign() {
    return 'string';
  }
}
