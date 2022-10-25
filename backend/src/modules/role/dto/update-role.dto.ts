import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { Role } from '@/typeorm';

export class UpdateRoleDto implements Partial<Role> {
  @IsNotEmpty()
  @IsNumber()
  rid: number;

  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsBoolean()
  read_team: boolean;

  @IsOptional()
  @IsBoolean()
  write_team: boolean;

  @IsOptional()
  @IsBoolean()
  update_team: boolean;

  @IsOptional()
  @IsBoolean()
  delete_team: boolean;

  @IsOptional()
  @IsBoolean()
  read_member: boolean;

  @IsOptional()
  @IsBoolean()
  write_member: boolean;

  @IsOptional()
  @IsBoolean()
  update_member: boolean;

  @IsOptional()
  @IsBoolean()
  delete_member: boolean;

  @IsOptional()
  @IsBoolean()
  read_task: boolean;

  @IsOptional()
  @IsBoolean()
  write_task: boolean;

  @IsOptional()
  @IsBoolean()
  update_task: boolean;

  @IsOptional()
  @IsBoolean()
  delete_task: boolean;
}
