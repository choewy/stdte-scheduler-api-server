import { ValidationPipe } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationException } from '../exceptions';

export class ValidatePipe extends ValidationPipe {
  constructor() {
    super({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
      validationError: {
        target: true,
        value: false,
      },
      exceptionFactory: (errors: ValidationError[]) => {
        return new ValidationException(errors);
      },
    });
  }
}
