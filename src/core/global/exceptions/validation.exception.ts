import { BadRequestException } from '@nestjs/common';
import { ValidationError } from 'class-validator';
import { ValidationErrorType } from './types';

export class ValidationException extends BadRequestException {
  private readonly __error: ValidationErrorType;

  constructor(errors: ValidationError[]) {
    super();

    const error = Object.entries(errors[0].constraints)[0];

    this.__error = {
      name: error[0],
      message: error[1],
    };
  }

  get error() {
    return this.__error;
  }
}
