import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty } from 'class-validator';

export class UpdateTeamMemberDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsArray()
  userIds: number[];
}
