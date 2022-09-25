import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserParamDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
