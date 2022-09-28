import { QueryBuilder, Repository } from 'typeorm';
import { IManager } from '../abstract.manager';
import { Task } from './task.entity';

export class TaskManager extends IManager<Task> {
  get repository(): Repository<Task> {
    return this.dataSource.getRepository(Task);
  }

  get queryBuilder(): QueryBuilder<Task> {
    return this.dataSource.createQueryBuilder(Task, this.name);
  }
}
