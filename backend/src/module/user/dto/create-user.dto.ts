import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
  @IsNotEmpty()
  @IsString()
  password: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
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
