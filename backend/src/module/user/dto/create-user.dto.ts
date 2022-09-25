import { HashPassword } from '@/appllication/transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsArray,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  nickname: string;

  @ApiProperty({ format: 'password' })
  @HashPassword()
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsEmail()
  email: string;

  @ApiPropertyOptional({
    type: 'number',
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  roleIds: number[];

  @ApiPropertyOptional({
    type: 'number',
    isArray: true,
  })
  @IsOptional()
  @IsArray()
  teamIds: number[];
}
