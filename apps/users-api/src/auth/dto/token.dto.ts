import { Role } from '.prisma/client';

export class LoginResponseDto {
  access_token: string;
}

export type TokenPayload = {
  email: string;
  username: string;
  sub: number;
  roles: Role[];
};
