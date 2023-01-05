import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  @Get()
  async findAll() {
    return (await this.usersService.getUsers()).map((el) => {
      return {
        id: el.id,
        email: el.email,
        username: el.username,
      };
    });
  }
}
