import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '../lib/jwt/jwt.service';
import { UsersService } from '../users/users.service';
import { TokenPayload } from './dto/token.dto';
import { UserDTO } from './dto/user.dto';
import { SaltService } from './salt.service';
import { PublicMembersOf } from './types.utils';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private saltService: SaltService,
  ) {}

  static createFake(config: AuthServiceFakeConfig = {}): AuthService {
    const fake: unknown = new AuthServiceFake(config);
    return fake as AuthService;
  }

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

export type AuthServiceFakeConfig = {
  failValidate?: boolean;
};
class AuthServiceFake implements PublicMembersOf<AuthService> {
  constructor(private config: AuthServiceFakeConfig) {}
  async validateUser(email: string, _pass: string): Promise<UserDTO> {
    if (this.config.failValidate) {
      // TODO: should make a public member (all errors should be treated as public members)
      throw new Error('unable to validate user');
    }
    return { email, id: 1, roles: [], username: '' };
  }
  async login(_user: UserDTO): Promise<{ access_token: string }> {
    return { access_token: 'fake access_token' };
  }
}
