import { LoggerService } from '@/core/logger';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ExceptionDto } from '../dto';
import { ValidationException } from '../exception';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {}

  async catch(exception: HttpException, host: ArgumentsHost) {
    const status = exception.getStatus();
    const dto: ExceptionDto = {
      status,
      error: exception.name.replace('Exception', ''),
      message: exception.message,
    };

    if (exception instanceof ValidationException) {
      dto.data = exception.errors;
    }

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    if (status < 500) {
      await this.loggerService.warn(request, dto);
    } else {
      await this.loggerService.error(request, dto);
    }

    const response = ctx.getResponse<Response>();
    return response.status(status).send(dto);
  }
}
