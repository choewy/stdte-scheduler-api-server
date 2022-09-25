import { LoggerService } from '@/core/logger';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  InternalServerErrorException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { ExceptionDto } from '../dto';

@Catch(Error)
export class ErrorFilter implements ExceptionFilter {
  constructor(private readonly loggerService: LoggerService) {}

  async catch(error: any, host: ArgumentsHost) {
    const exception = new InternalServerErrorException();
    const status = exception.getStatus();
    const dto: ExceptionDto = {
      status,
      error: exception.name.replace('Exception', ''),
      message: exception.message,
      data: error,
    };

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();
    const stack = error.stack;

    this.loggerService.error(request, dto, stack);

    const response = ctx.getResponse<Response>();
    return response.status(status).send(dto);
  }
}
