import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class TeamParamDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
