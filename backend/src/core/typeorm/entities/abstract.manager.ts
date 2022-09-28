import { DataSource, QueryBuilder, Repository } from 'typeorm';

export abstract class IManager<T> {
  constructor(public dataSource: DataSource, public name: string) {}

  get repository(): Repository<T> {
    return;
  }

  get queryBuilder(): QueryBuilder<T> {
    return;
  }
}
