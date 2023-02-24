import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

export type findAllDTO = {
  id: number;
  email: string;
  username: string;
};

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

// Since this is "top level" there's no dependency needed to fake.
