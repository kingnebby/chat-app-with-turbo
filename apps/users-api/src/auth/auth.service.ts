import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { TokenPayload } from './dto/token.dto';
import { UserDTO, UserType } from './dto/user.dto';
import { SaltService } from './salt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private saltService: SaltService,
  ) {}

  static createFake(config: AuthServiceFakeConfig = {}) {
    return new AuthService(
      new UserServiceFake(),
      new JwtServiceFake(),
      new SaltServiceFake({ failValidate: config.failValidate }),
    );
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

type AuthServiceFakeConfig = {
  failValidate?: boolean;
};

class JwtServiceFake extends JwtService {
  /**
   * TODO: implement this method. I'm wondering if in the constructor
   * we allow flags that say "validate: true/false" to run different scenarios.
   */
  // validateUser()

  sign() {
    return 'signed_jwt_token';
  }
}

class UserServiceFake extends UsersService {
  constructor() {
    super({} as any);
  }
  async getPassword(_email: string): Promise<string> {
    return 'password';
  }
  async findOne(_email: string): Promise<UserType> {
    return {
      username: '',
      email: '',
      id: 1,
      usersRoles: [],
    };
  }
  // async findOne() {
  //   return {}
  // }
}

type SaltServiceConfig = {
  failValidate: boolean;
};
class SaltServiceFake extends SaltService {
  constructor(private readonly config: SaltServiceConfig) {
    super();
  }
  async compare() {
    if (this.config.failValidate === true) {
      throw new Error('compare function failed');
    }
    return true;
  }
}
