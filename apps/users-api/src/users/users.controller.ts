import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  findAll() {
    console.log('no users yet');
    return [{ username: 'fake username' }];
  }
}
