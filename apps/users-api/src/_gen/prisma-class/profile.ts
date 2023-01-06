import { User } from './user';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class Profile {
  @ApiProperty({ type: Number })
  id: number;

  @ApiPropertyOptional({ type: String })
  bio?: string;

  @ApiProperty({ type: () => User })
  user: User;

  @ApiProperty({ type: Number })
  userId: number;
}
