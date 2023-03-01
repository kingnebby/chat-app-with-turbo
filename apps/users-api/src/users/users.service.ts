import { Injectable } from '@nestjs/common';
import { User } from '.prisma/client';
import { UserType } from 'src/auth/dto/user.dto';
import { UserModel } from './user.model';
import { exclude } from './exclude';
import { PublicMembersOf } from '../auth/types.utils';

export type PartialUser = Partial<User>;

@Injectable()
export class UsersService {
  constructor(private readonly userModel: UserModel) {}

  // One problem with allowing partials is that you have to do
  // some type casting when the Fake class implements the main class.
  static createFake(config?: { users?: PartialUser[] }): UsersService {
    // Because typescript still has issues with types, we have to help.
    return <UsersService>(<unknown>new UserServiceFake(config));
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

class UserServiceFake implements PublicMembersOf<UsersService> {
  fakeUsers: PartialUser[] = [
    {
      id: 1,
      email: 'email',
      username: 'username',
      password: 'password',
      usersRoles: [],
    },
  ];
  constructor(config?: { users?: PartialUser[] }) {
    if (config?.users) {
      this.fakeUsers = config.users;
    }
  }
  async getUsers(): Promise<Omit<User, 'password'>[]> {
    return this.fakeUsers.map(({ password, ...rest }) => rest) as User[];
  }
  async findOne(email: string): Promise<UserType> {
    return this.fakeUsers.find((el) => el.email === email) as User;
  }
  async getPassword(email: string): Promise<string> {
    const user = this.fakeUsers.find((el) => el.email === email);
    if (!user) {
      throw new Error('could not find user');
    }
    return user.password;
  }
}
