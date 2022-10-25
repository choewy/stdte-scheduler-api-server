import { exampleEnumKeys } from '@/core';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { AppError } from './enums';

export class AppExceptionRvo {
  @ApiResponseProperty()
  @Expose()
  status: number;

  @ApiResponseProperty()
  @Expose()
  message: string;

  @ApiResponseProperty()
  @Expose()
  error: string;

  @ApiResponseProperty({
    example: exampleEnumKeys(AppError),
  })
  @Expose()
  errorName: string;

  @ApiResponseProperty()
  @Expose()
  details?: any;
}
