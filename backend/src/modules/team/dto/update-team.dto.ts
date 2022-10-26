import { IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class UpdateTeamDto {
  @IsNotEmpty()
  @IsNumber()
  tid: number;

  @IsOptional()
  @IsString()
  name: string;
}
