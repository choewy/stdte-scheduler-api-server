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
  async catch(exception: HttpException, host: ArgumentsHost) {
    const status = exception.getStatus();
    const body: ExceptionDto = {
      status,
      error: exception.name.replace('Exception', ''),
      message: exception.message,
    };

    if (exception instanceof ValidationException) {
      body.data = exception.errors;
    }

    const ctx = host.switchToHttp();
    const request = ctx.getRequest<Request>();

    const response = ctx.getResponse<Response>();
    return response.status(status).send(body);
  }
}
