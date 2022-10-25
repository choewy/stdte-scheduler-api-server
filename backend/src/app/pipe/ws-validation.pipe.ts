import { ValidationPipe } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { ValidationError } from 'class-validator';

export class WsValidationPipe extends ValidationPipe {
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
        const { constraints } = errors[0];
        const message = Object.values(constraints)[0];

        return new WsException({
          status: 400,
          error: 'BadRequest',
          message,
        });
      },
    });
  }
}
