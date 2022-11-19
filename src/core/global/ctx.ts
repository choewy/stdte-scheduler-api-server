import { HttpException, Logger } from '@nestjs/common';
import { HttpArgumentsHost } from '@nestjs/common/interfaces';
import { Response } from 'express';
import { ExceptionResponseProperty } from './dto';
import { ValidationException } from './exceptions';
import { RequestCtx } from './types';

export class FilterLogCtx {
  private readonly request: RequestCtx;
  private readonly response: Response;

  public readonly status: number;
  public readonly name: string;
  public readonly details: any;
  public readonly stack?: string;

  constructor(
    logger: Logger,
    http: HttpArgumentsHost,
    exception: HttpException,
    error?: unknown,
  ) {
    this.request = http.getRequest<RequestCtx>();
    this.response = http.getResponse();
    this.status = exception.getStatus();
    this.name = exception.name.replace('Exception', '');

    this.details = error
      ? error
      : exception instanceof ValidationException
      ? exception.error
      : exception.cause
      ? {
          name: exception.cause.name,
          message: exception.cause.message,
        }
      : null;

    if (this.status >= 500) {
      logger.error(
        this.message,
        error['stack'] || exception.stack,
        this.request.ctx,
      );
    } else {
      logger.warn(this.message, this.request.ctx);
    }

    this.response.status(this.status).send(this.body);
  }

  private get body(): ExceptionResponseProperty {
    return {
      status: this.status,
      name: this.name,
      details: this.details,
    };
  }

  private get message() {
    const { method, ip, path } = this.request;
    return `${this.name}(${ip} - ${method} - ${path})`;
  }
}

export class InterceptorLogCtx {
  private readonly request: RequestCtx;

  constructor(
    private readonly logger: Logger,
    http: HttpArgumentsHost,
    className?: string,
  ) {
    this.request = http.getRequest<RequestCtx>();
    this.request.ctx = className || 'NestApplication';
  }

  private get message() {
    const { method, ip, path } = this.request;
    return `(${ip} - ${method} - ${path})`;
  }

  public get log() {
    this.logger.verbose(this.message, this.request.ctx);
    return;
  }
}
