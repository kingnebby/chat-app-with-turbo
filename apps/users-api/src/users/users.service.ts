import { Injectable } from '@nestjs/common';
import { User } from '.prisma/client';
import { UserType } from 'src/auth/dto/user.dto';
import { UserModel } from './user.model';
import { exclude } from './exclude';

@Injectable()
export class UsersService {
  constructor(private readonly userModel: UserModel) {}

  static createFake(config: { users: UserModelFakeConfig } = { users: [] }) {
    const fakeModel: any = new UserModelFake(config.users);
    return new UsersService(fakeModel);
  }

  async getUsers() {
    const allUsers = await this.userModel.findMany();
    return allUsers.map((user) => exclude(user, ['password']));
  }

  async findOne(email: string): Promise<UserType> {
    const user = await this.userModel.findUniqueByEmail(email);
    return exclude(user, ['password']);
  }

  async getPassword(email: string) {
    const user = await this.userModel.findUniqueByEmail(email);
    return user.password;
  }
}

// Fake Dependencies
export type UserModelFakeConfig = Array<Partial<User>>;
class UserModelFake {
  constructor(private readonly config: UserModelFakeConfig) {}
  /**
   * @returns all items
   */
  findMany() {
    return this.config;
  }
  /**
   * @returns returns the first element always
   */
  findUniqueByEmail() {
    return this.config[0];
  }
}
