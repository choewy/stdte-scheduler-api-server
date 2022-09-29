import { QueryBuilder, Repository } from 'typeorm';
import { IManager } from '../abstract.manager';
import { Role } from './role.entity';

export class RoleManager extends IManager<Role> {
  get repository(): Repository<Role> {
    return this.dataSource.getRepository(Role);
  }

  get queryBuilder(): QueryBuilder<Role> {
    return this.dataSource.createQueryBuilder(Role, this.name);
  }

  selectByIdsQuery(ids: number[]) {
    return this.queryBuilder
      .select()
      .innerJoinAndSelect('role.policy', 'policy')
      .where('role.id IN (:ids)', { ids });
  }
}
