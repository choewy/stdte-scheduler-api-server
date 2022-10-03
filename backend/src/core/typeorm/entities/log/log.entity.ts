import { ExceptionDto } from '@/server/dto';
import { Request } from 'express';
import { DateTime } from 'luxon';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateTimeColumn } from '../../columns';

export type LogType = 'success' | 'warning' | 'error';

@Entity('log')
export class Log {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  type: LogType;

  @Column({ default: 'TASK-SCHEDULER-API-SERVER' })
  application: string;

  @Column({ default: null })
  httpStatus: string;

  @Column({ default: null })
  httpStatusCode: number;

  @Column({ default: null })
  httpMethod: string;

  @Column({ default: null })
  httpPath: string;

  @Column({ type: 'json', default: null })
  httpParams: any;

  @Column({ type: 'json', default: null })
  httpQuery: any;

  @Column({ default: null })
  httpClientIp: string;

  @Column({ default: 'Application' })
  context: string;

  @Column({ type: 'json', default: null })
  errorData: any;

  @Column({ type: 'text' })
  errorStack: string;

  @CreateDateTimeColumn()
  createdAt: DateTime;

  constructor(
    type?: LogType,
    request?: Request,
    dto?: ExceptionDto,
    stack?: string,
  ) {
    if (type) {
      this.type = type;
    }

    if (request) {
      this.type = type;

      const { method, path, ip, params, query } = request;
      this.httpMethod = method;
      this.httpPath = path;
      this.httpClientIp = ip;

      const context = request['context'];
      if (context) {
        this.context = context;
      }

      if (Object.keys(params).length) {
        this.httpParams = params;
      }

      if (Object.keys(query).length) {
        this.httpParams = query;
      }
    }

    if (dto) {
      const { error, status, data } = dto;
      this.httpStatus = error;
      this.httpStatusCode = status;
      this.errorData = data;
    }

    this.errorStack = stack || '';
  }
}
