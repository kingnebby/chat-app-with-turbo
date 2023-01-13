import { Profile } from './profile';
import { Role } from '@prisma/client';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class User {
  @ApiProperty({ type: Number })
  id: number;

  @ApiProperty({ type: String })
  email: string;

  @ApiPropertyOptional({ type: String })
  password?: string;

  @ApiPropertyOptional({ type: String })
  username?: string;

  @ApiPropertyOptional({ type: () => Profile })
  profile?: Profile;

  @ApiProperty({ isArray: true, enum: Role, enumName: 'Role' })
  usersRoles: Role[] = [Role.USER];
}
