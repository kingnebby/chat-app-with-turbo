export class LoginResponseDto {
  access_token: string;
}

export type TokenPayload = {
  username: string;
  sub: number;
  roles: string[];
};
