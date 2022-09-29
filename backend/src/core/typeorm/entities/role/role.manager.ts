import { QueryBuilder, Repository, SelectQueryBuilder } from 'typeorm';
import { IManager } from '../abstract.manager';
import { Role, RoleType } from './role.entity';

export class RoleManager extends IManager<Role> {
  get repository(): Repository<Role> {
    return this.dataSource.getRepository(Role);
  }

  get queryBuilder(): QueryBuilder<Role> {
    return this.dataSource.createQueryBuilder(Role, this.name);
  }

  whereQuery(
    query: SelectQueryBuilder<Role>,
    params: Partial<Role>,
    isFirst?: boolean,
  ) {
    const entries = Object.entries(params).reverse();

    if (isFirst) {
      const [key, param] = entries.pop();
      query.where(`role.${key} = :param`, { param });
    }

    while (entries.length > 0) {
      const [key, param] = entries.pop();
      query.andWhere(`role.${key} = :param`, { param });
    }

    return query;
  }

  selectWithRolePolicyQuery() {
    return this.queryBuilder
      .select()
      .innerJoinAndSelect('role.policy', 'policy');
  }

  selectByIdsQuery(ids: number[]) {
    return this.queryBuilder
      .select()
      .innerJoinAndSelect('role.policy', 'policy')
      .where('role.id IN (:ids)', { ids });
  }

  selectIncludeRoleTypeQuery(types: RoleType[]) {
    return this.queryBuilder
      .select()
      .innerJoinAndSelect('role.policy', 'policy')
      .where('role.type IN (:types)', { types });
  }

  selectExcludeRoleTypeQuery(types: RoleType[]) {
    return this.queryBuilder
      .select()
      .innerJoinAndSelect('role.policy', 'policy')
      .where('role.type NOT IN (:types)', { types });
  }
}
