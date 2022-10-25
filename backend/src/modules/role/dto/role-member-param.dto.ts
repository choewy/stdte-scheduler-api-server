import { IsNotEmpty, IsNumber } from 'class-validator';

export class RoleMemberParamDto {
  @IsNotEmpty()
  @IsNumber()
  rid: number;

  @IsNotEmpty()
  @IsNumber()
  uid: number;
}
