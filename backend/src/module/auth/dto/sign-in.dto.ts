import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignInDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  username: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiProperty({ format: 'password' })
  @IsNotEmpty()
  @IsString()
  password: string;
}
