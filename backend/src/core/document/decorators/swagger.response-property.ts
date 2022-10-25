import { Expose } from 'class-transformer';
import { applyDecorators } from '@nestjs/common';
import { ApiResponseProperty } from '@nestjs/swagger';
import { SwaggerResPropertyOptions } from './types';
import { DateTimeToString } from '@/typeorm/helpers';

export const SwaggerResProperty = (options?: SwaggerResPropertyOptions) => {
  return applyDecorators(ApiResponseProperty(options), Expose());
};

export const SwaggerResDateTimeProperty = () => {
  return applyDecorators(
    ApiResponseProperty({ type: 'string' }),
    DateTimeToString(),
    Expose(),
  );
};
