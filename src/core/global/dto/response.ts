import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { ExceptionResponseProperty } from './types';

export class ExceptionResponse implements ExceptionResponseProperty {
  @ApiResponseProperty()
  @Expose()
  status: number;

  @ApiResponseProperty()
  @Expose()
  name: string;

  @ApiResponseProperty({
    example: null,
  })
  @Expose()
  details: null | any;
}
