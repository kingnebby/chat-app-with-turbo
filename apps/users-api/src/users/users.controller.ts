import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '.prisma/client';

export type findAllDTO = {
  id: number;
  email: string;
  username: string;
};

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  static createFake() {
    const fakeUserService: any = new UsersServiceFake();
    return new UsersController(fakeUserService);
  }

  @Get()
  async findAll(): Promise<findAllDTO[]> {
    return (await this.usersService.getUsers()).map((el) => {
      return {
        id: el.id,
        email: el.email,
        username: el.username,
      };
    });
  }
}

class UsersServiceFake {
  async getUsers(): Promise<User[]> {
    return [
      {
        email: 'email',
        id: 1,
        password: 'password',
        username: 'username',
        usersRoles: ['ADMIN'],
      },
    ];
  }
}
