import { ExceptionDto } from '@/appllication/dto';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { DataSource, Repository } from 'typeorm';
import { Logs, LogType } from '../typeorm/entities';

@Injectable()
export class LoggerRepository {
  private readonly target: Repository<Logs>;

  constructor(private readonly dataSource: DataSource) {
    this.target = this.dataSource.getRepository(Logs);
  }

  async insertOne(
    type: LogType,
    request: Request,
    dto?: ExceptionDto,
    stack?: string,
  ): Promise<void> {
    const params = Object.keys(request.params).length ? request.params : null;
    const query = Object.keys(request.query).length ? request.query : null;
    await this.target.insert(
      Object.assign<Logs, Partial<Logs>>(new Logs(), {
        type,
        application: 'STDTE-TASK-SCHEDULER-API-SERVER',
        httpStatus: dto.error,
        httpStatusCode: dto.status,
        httpMethod: request.method,
        httpPath: request.path,
        httpParams: params,
        httpQuery: query,
        httpClientIp: request.ip,
        context: request['context'] || 'Application',
        errorData: dto.data,
        errorStack: stack || '',
      }),
    );
  }
}
