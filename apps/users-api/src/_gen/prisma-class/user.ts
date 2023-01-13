import { Profile } from './profile';
import { Role } from '../../.pnpm/@prisma+client@4.8.1_prisma@4.8.1/node_modules/@prisma/client';
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
  usersRoles: Role[] = [USER];
}
