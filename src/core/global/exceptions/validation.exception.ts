import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationErrorObject } from './types';

export class ValidationException extends BadRequestException {
  private readonly __errors: ValidationErrorObject;

  constructor(errors: ValidationError[]) {
    super();
    this.__errors = {};
    errors.forEach((error) => {
      const { property, constraints } = error;
      this.__errors[property] = Object.keys(constraints);
    });
  }

  get error() {
    Object.entries(this.__errors)[0];
    return;
  }

  get errors(): ValidationErrorObject {
    return this.__errors;
  }
}
