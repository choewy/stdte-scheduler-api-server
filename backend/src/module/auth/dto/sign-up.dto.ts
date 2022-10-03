import { HashPassword } from '@/server/transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class SignUpDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @IsEmail()
  email: string;

  @ApiProperty({ format: 'password' })
  @HashPassword()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiProperty({ format: 'password' })
  @IsNotEmpty()
  @IsString()
  confirmPassword: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nickname: string;
}
