import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty } from 'class-validator';

export enum UpdateRoleMemberMethod {
  Append = 'append',
  Remove = 'remove',
}

export class UpdateRoleMemberQueryDto {
  @ApiProperty({ enum: UpdateRoleMemberMethod })
  @IsNotEmpty()
  @IsEnum(UpdateRoleMemberMethod)
  method: UpdateRoleMemberMethod;
}
