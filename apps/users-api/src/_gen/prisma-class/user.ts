import { Profile } from './profile';
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
}
