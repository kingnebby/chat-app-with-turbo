import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '.prisma/client';
import { UserType } from 'src/auth/dto/user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly prisma: PrismaClient) {}

  static createFake(): UsersService {
    return <UsersService>(<unknown>new UsersServiceFake());
  }
  async getUsers() {
    const allUsers = await this.prisma.user.findMany();
    return allUsers;
  }

  async findOne(email: string): Promise<UserType> {
    const user = await this.prisma.user.findUnique({
      where: { email: email },
    });
    return exclude(user, ['password']);
  }

  async getPassword(email: string) {
    const user = await this.prisma.user.findUnique({ where: { email: email } });
    return user.password;
  }
}

// TODO: make a generic utility
function exclude<T, Key extends keyof T>(object: T, keys: Key[]): Omit<T, Key> {
  for (const key of keys) {
    delete object[key];
  }
  return object;
}

// TODO: make a generic utility
type PublicMembersOf<T> = { [K in keyof T]: T[K] };
class UsersServiceFake implements PublicMembersOf<UsersService> {
  fakeUsers: User[] = [
    {
      email: 'email',
      id: 1,
      password: 'password',
      username: 'username',
      usersRoles: [],
    },
  ];

  async getUsers(): Promise<User[]> {
    throw new Error('Method not implemented.');
  }
  async findOne(email: string): Promise<UserType> {
    return this.fakeUsers.find((user) => user.email === email);
  }
  async getPassword(email: string): Promise<string> {
    const user = this.fakeUsers.find((user) => user.email === email);
    if (user) {
      return user.password;
    }
    throw new Error('could not find user');
  }
}
