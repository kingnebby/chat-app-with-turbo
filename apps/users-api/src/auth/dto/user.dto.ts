import { Role } from '@prisma/client';

export class UserDTO {
  username: string;
  email: string;
  id: number;
  roles: Role[];
}
