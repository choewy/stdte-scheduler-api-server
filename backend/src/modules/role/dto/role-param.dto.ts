import { IsNotEmpty, IsNumber } from 'class-validator';

export class RoleParamDto {
  @IsNotEmpty()
  @IsNumber()
  rid: number;
}
