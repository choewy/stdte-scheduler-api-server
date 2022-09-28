import { DateTime } from 'luxon';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CreateDateTimeColumn } from '../columns';

export type LogType = 'success' | 'warning' | 'error';

@Entity('logs')
export class Logs {
  @PrimaryGeneratedColumn()
  readonly id: number;

  @Column()
  type: LogType;

  @Column()
  application: string;

  @Column()
  httpStatus: string;

  @Column()
  httpStatusCode: number;

  @Column()
  httpMethod: string;

  @Column()
  httpPath: string;

  @Column({ type: 'json', default: null })
  httpParams: any;

  @Column({ type: 'json', default: null })
  httpQuery: any;

  @Column()
  httpClientIp: string;

  @Column({ default: null })
  context: string;

  @Column({ type: 'json', default: null })
  errorData: any;

  @Column({ type: 'text' })
  errorStack: string;

  @CreateDateTimeColumn()
  createdAt: DateTime;
}
