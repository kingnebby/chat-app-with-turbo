import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Role } from '.prisma/client';
import { Observable } from 'rxjs';
import { RequestUser } from 'src/auth/dto/request-user';
import { SET_ROLES_KEY } from './role.decorator';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const expectedRoles = this.reflector.getAllAndOverride<Role[]>(
      SET_ROLES_KEY,
      [context.getHandler(), context.getClass()],
    );
    if (!expectedRoles) return true;

    type UserRequest = {
      user: RequestUser;
      params: { id: string };
    };
    const { params, user } = context.switchToHttp().getRequest() as UserRequest;

    // Move this to another endpoint.
    // // if this user owns the data, good to go.
    if (user.userId === parseInt(params.id)) {
      return true;
    }

    // if user contains required role
    const containsOneRole =
      expectedRoles
        .map((expectedRole) => {
          return user.roles.includes(expectedRole);
        })
        .filter((el) => el).length > 0;

    if (containsOneRole) return true;

    return false;
  }
}
