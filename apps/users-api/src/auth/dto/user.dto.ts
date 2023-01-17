import { Role, User } from '@prisma/client';

export type UserType = Omit<User, 'password'>;

export class UserDTO {
  username: string;
  email: string;
  id: number;
  roles: Role[];
}
