import { ApiProperty } from '@nestjs/swagger';
import { IsArray } from 'class-validator';

export class UpdateRoleMemberDto {
  @ApiProperty()
  @IsArray()
  userIds: number[];
}
