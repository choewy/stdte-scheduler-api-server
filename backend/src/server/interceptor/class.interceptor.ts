import { ClassSerializerInterceptor } from '@nestjs/common';
import { Reflector } from '@nestjs/core';

export class ClassInterceptor extends ClassSerializerInterceptor {
  constructor(reflector: Reflector) {
    super(reflector, {
      strategy: 'excludeAll',
      excludeExtraneousValues: true,
    });
  }
}
