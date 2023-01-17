import { SetMetadata } from '@nestjs/common';
import { Role } from '@prisma/client';

export const SET_ROLES_KEY = 'roles';
export const SetRole = (roles: Role[]) => {
  return SetMetadata(SET_ROLES_KEY, roles);
};
