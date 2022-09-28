import { QueryBuilder, Repository } from 'typeorm';
import { IManager } from '../abstract.manager';
import { Log } from './log.entity';

export class LogManager extends IManager<Log> {
  get repository(): Repository<Log> {
    return this.dataSource.getRepository(Log);
  }

  get queryBuilder(): QueryBuilder<Log> {
    return this.dataSource.createQueryBuilder(Log, this.name);
  }
}
