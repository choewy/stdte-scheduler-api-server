import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class ExceptionDto {
  @ApiResponseProperty()
  @Expose()
  status: number;

  @ApiResponseProperty()
  error: string;

  @ApiResponseProperty()
  @Expose()
  message: string;

  @ApiResponseProperty()
  @Expose()
  data?: any;
}
