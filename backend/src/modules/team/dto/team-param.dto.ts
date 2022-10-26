import { IsNotEmpty, IsNumber } from 'class-validator';

export class TeamParamDto {
  @IsNotEmpty()
  @IsNumber()
  tid: number;
}
