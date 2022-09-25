import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export enum UpdateTeamMemberMethod {
  Append = 'append',
  Remove = 'remove',
}

export class UpdateTeamMemberQueryDto {
  @ApiProperty({ enum: UpdateTeamMemberMethod })
  @IsNotEmpty()
  @IsEnum(UpdateTeamMemberMethod)
  method: UpdateTeamMemberMethod;
}
