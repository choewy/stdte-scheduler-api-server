import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export enum NotificationType {
  Info = 'info',
  Success = 'success',
  Error = 'error',
  Warning = 'warning',
}

export class NotificationDto {
  @ApiProperty({ enum: NotificationType })
  @IsNotEmpty()
  @IsEnum(NotificationType)
  type: NotificationType;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  message: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsNumber()
  duration: number;
}
