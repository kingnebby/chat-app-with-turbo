import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { UsersService } from 'src/users/users.service';
import { TokenPayload } from './dto/token.dto';
import { compare } from './salt-password';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<User> {
    const dbPassword = await this.usersService.getPassword(email);
    if (await compare(pass, dbPassword)) {
      const userDto = await this.usersService.findOne(email);
      Logger.log({ user: userDto }, 'user logged in');
      return userDto;
    }
    Logger.error({ email }, 'passwords do not match');
    throw new Error('unable to validate users');
  }

  async login(user: User) {
    const payload: TokenPayload = {
      username: user.email,
      sub: user.id,
      roles: user.usersRoles,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
