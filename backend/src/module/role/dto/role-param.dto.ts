import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class RoleParamDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
