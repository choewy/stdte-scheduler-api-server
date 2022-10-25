import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SearchUsersDto {
  @IsNotEmpty()
  @IsNumber()
  rid: number;

  @IsString()
  keyword: string;
}
