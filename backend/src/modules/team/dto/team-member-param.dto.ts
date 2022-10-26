import { IsNotEmpty, IsNumber } from 'class-validator';

export class TeamMemberParamDto {
  @IsNotEmpty()
  @IsNumber()
  tid: number;

  @IsNotEmpty()
  @IsNumber()
  uid: number;
}
