import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class UserParam {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
