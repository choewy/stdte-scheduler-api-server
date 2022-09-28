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
    const log = new Logs();

    log.application = 'TASK-SCHEDULER-API-SERVER';
    log.type = type;
    log.httpStatus = dto.error || '';
    log.httpStatusCode = dto.status || 0;
    log.httpMethod = request.method || '';
    log.httpPath = request.path || '';
    log.httpParams = Object.keys(request.params).length ? request.params : null;
    log.httpQuery = Object.keys(request.query).length ? request.query : null;
    log.httpClientIp = request.ip || '';
    log.context = request['context'] || 'Application';
    log.errorData = dto.data || null;
    log.errorStack = stack || '';

    await this.target.insert(log);
  }
}
