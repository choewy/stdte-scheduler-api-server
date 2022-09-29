import { TeamStatus } from '@/core/typeorm/entities';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString } from 'class-validator';

export class UpdateTeamDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;

  @ApiPropertyOptional({ enum: TeamStatus })
  @IsOptional()
  @IsEnum(TeamStatus)
  status: TeamStatus;
}
