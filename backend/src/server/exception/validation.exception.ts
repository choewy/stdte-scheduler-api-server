import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';

type ValidationErrorData = Record<string, string[]>;

export class ValidationException extends BadRequestException {
  private readonly errors$: ValidationErrorData = {};

  constructor(errors: ValidationError[]) {
    super();
    errors.forEach((error) => {
      const { property, constraints } = error;
      this.errors$[property] = Object.keys(constraints);
    });
  }

  get errors(): ValidationErrorData {
    return this.errors$;
  }
}
