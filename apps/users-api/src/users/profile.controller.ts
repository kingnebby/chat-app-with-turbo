import { Controller, Get, Request, Logger, Post, Param } from '@nestjs/common';
import { SetRole } from 'src/role-guard/role.decorator';

@Controller('users')
export class ProfileController {
  @Get('/profile')
  getProfile(@Request() req) {
    Logger.log({ user: req.user });
    return req.user;
  }

  @Post('/:id/profile')
  @SetRole(['ADMIN'])
  updateProfile(@Param() params: { id: number }) {
    // TODO: update the db
    const id = params.id;
    Logger.log({ id });
  }
}
