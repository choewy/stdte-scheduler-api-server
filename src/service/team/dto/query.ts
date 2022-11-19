import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { TeamMemberMethod } from './enums';

export class TeamMemberMethodQuery {
  @ApiProperty({
    description: '삭제/추가',
    enum: TeamMemberMethod,
  })
  @IsString()
  @IsEnum(TeamMemberMethod)
  method: TeamMemberMethod;
}
