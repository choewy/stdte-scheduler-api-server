import { IsDateTime, ToDateTime } from '@/core/common';
import { TaskStatus, TaskType } from '@/core/typeorm/entities';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOptional,
  IsString,
} from 'class-validator';
import { DateTime } from 'luxon';

export class CreateTaskBody {
  @ApiProperty({
    description: '사업 구분',
    enum: TaskType,
  })
  @IsNotEmpty()
  @IsEnum(TaskType)
  type: TaskType;

  @ApiProperty({
    description: '사업 코드',
  })
  @IsNotEmpty()
  @IsString()
  code: string;

  @ApiProperty({
    description: '사업명',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiPropertyOptional({
    description: '사업 개요',
  })
  @IsOptional()
  @IsString()
  summary: string;

  @ApiPropertyOptional({
    description: '기대 수익',
  })
  @IsOptional()
  @IsNumberString()
  revenue: string;

  @ApiPropertyOptional({
    description: '진행 상태',
    enum: TaskStatus,
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status: TaskStatus;

  @ApiPropertyOptional({
    description: '시작일자',
    type: 'string',
    format: 'date',
  })
  @IsOptional()
  @ToDateTime()
  @IsDateTime()
  startAt: DateTime;

  @ApiPropertyOptional({
    description: '종료일자',
    type: 'string',
    format: 'date',
  })
  @IsOptional()
  @ToDateTime()
  @IsDateTime()
  endAt: DateTime;

  @ApiPropertyOptional({
    description: '보증기한',
    type: 'string',
    format: 'date',
  })
  @IsOptional()
  @ToDateTime()
  @IsDateTime()
  warrantyAt: DateTime;
}

export class TaskTeamBody {
  @ApiProperty({
    description: '팀 PK',
  })
  @IsNotEmpty()
  @IsNumber()
  teamId: number;
}
