import {
  ClassSerializerInterceptor,
  ClassSerializerInterceptorOptions,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export class SerializeInterceptor extends ClassSerializerInterceptor {
  constructor(
    reflector: Reflector,
    options: ClassSerializerInterceptorOptions = {
      strategy: 'excludeAll',
      excludeExtraneousValues: true,
    },
  ) {
    super(reflector, options);
  }
}
