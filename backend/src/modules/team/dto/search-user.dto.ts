import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SearchUsersDto {
  @IsNotEmpty()
  @IsNumber()
  tid: number;

  @IsString()
  keyword: string;
}
