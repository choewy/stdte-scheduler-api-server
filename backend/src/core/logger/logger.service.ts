import { ExceptionDto } from '@/appllication/dto';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoggerRepository } from './logger.repository';

@Injectable()
export class LoggerService {
  private httpStatus: Record<number, string>;

  constructor(
    private readonly logger: Logger,
    private readonly repository: LoggerRepository,
  ) {
    this.httpStatus = Object.fromEntries(
      Object.entries(HttpStatus).map(([key, value]) => [value, key]),
    );
  }

  private successMessage(request: Request, { statusCode }: Response): string {
    return [
      `${this.httpStatus[statusCode]}(${statusCode})`,
      `${request.method}(${request.ip})`,
      `${request.path}`,
    ].join(' - ');
  }

  private failMessage(request: Request, dto: ExceptionDto) {
    return [
      `${dto.error}(${dto.status})`,
      `${request.method}(${request.ip})`,
      `${request.path}`,
    ].join(' - ');
  }

  async verbose(request: Request, response: Response) {
    await this.repository.insertOne('success', request, {
      status: response.statusCode,
      error: this.httpStatus[response.statusCode],
      message: '',
    });
    this.logger.verbose(this.successMessage(request, response));
  }

  async warn(request: Request, dto: ExceptionDto) {
    await this.repository.insertOne('warning', request, dto);
    this.logger.warn(this.failMessage(request, dto), request['context']);
  }

  async error(request: Request, dto: ExceptionDto, stack?: string) {
    await this.repository.insertOne('error', request, dto, stack);
    this.logger.error(
      this.failMessage(request, dto),
      request['context'],
      stack,
    );
  }
}
