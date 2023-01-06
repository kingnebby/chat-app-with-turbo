import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { PrismaModel } from '../_gen/prisma-class';
import { UserDTO } from './dto/user.dto';
import { compare, hashPassword } from './salt-password';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<UserDTO> {
    const dbPassword = await this.usersService.getPassword(email);
    if (await compare(pass, dbPassword)) {
      const userDto = await this.usersService.findOne(email);
      Logger.log({ user: userDto }, 'user logged in');
      return userDto;
    }
    Logger.error({ email }, 'passwords do not match');
    throw new Error('unable to validate users');
  }

  async login(user: PrismaModel.User) {
    const payload = {
      username: user.email,
      sub: user.id /*roles: user.roles */,
    };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
