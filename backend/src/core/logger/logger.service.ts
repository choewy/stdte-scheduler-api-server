import { Request, Response } from 'express';
import { ExceptionDto } from '@/server/dto';
import { HttpStatus, Injectable, Logger } from '@nestjs/common';
import { LoggerRepository } from './logger.repository';
import { Log } from '../typeorm/entities';

@Injectable()
export class LoggerService {
  private httpStatus: Record<number, string>;

  constructor(
    private readonly logger: Logger,
    private readonly repository: LoggerRepository,
  ) {
    const entries = Object.entries(HttpStatus);
    this.httpStatus = Object.fromEntries(
      entries.map(([key, value]) => [value, key]),
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
    const log = new Log('error', request);
    await this.repository.insertOne(log);
    this.logger.verbose(this.successMessage(request, response));
  }

  async warn(request: Request, dto: ExceptionDto) {
    const log = new Log('error', request, dto);
    await this.repository.insertOne(log);
    this.logger.warn(this.failMessage(request, dto), request['context']);
  }

  async error(request: Request, dto: ExceptionDto, stack?: string) {
    const log = new Log('error', request, dto, stack);
    await this.repository.insertOne(log);
    this.logger.error(
      this.failMessage(request, dto),
      request['context'],
      stack,
    );
  }
}
