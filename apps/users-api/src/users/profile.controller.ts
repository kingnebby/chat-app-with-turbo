import { Controller, Get, Request, Logger, Post, Param } from '@nestjs/common';
import { SetRole } from 'src/role-guard/role.decorator';

@Controller('users')
// @UseGuards(JwtAuthGuard) // TODO: move to be app level handler
export class ProfileController {
  @Get('/profile')
  // @UseGuards(JwtAuthGuard)
  getProfile(@Request() req) {
    Logger.log({ user: req.user });
    return req.user;
  }

  @Post('/:id/profile')
  // @UseGuards(JwtAuthGuard) // TODO: move to be app level handler
  @SetRole(['ADMIN'])
  updateProfile(@Param() params: { id: number }) {
    const id = params.id;
    Logger.log({ id });
    // Logger.log({}, 'only users and admins can update this data');
  }
}
