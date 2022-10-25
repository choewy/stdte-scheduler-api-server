import { HttpException } from '@nestjs/common';
import { AppError } from './enums';
import { AppErrorMap } from './errors';

export class AppException extends HttpException {
  constructor(errorName: AppError, details?: any) {
    const data = AppErrorMap[errorName](details);
    data.name = errorName;
    super(data, data.status);
  }
}
