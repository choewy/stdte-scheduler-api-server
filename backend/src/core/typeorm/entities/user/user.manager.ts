import { SelectQueryBuilder } from 'typeorm';
import { IManager } from '../abstract.manager';
import { RoleType } from '../role';
import { User } from './user.entity';

export class UserManager extends IManager<User> {
  get repository() {
    return this.dataSource.getRepository(User);
  }

  get queryBuilder() {
    return this.dataSource.createQueryBuilder(User, this.name);
  }

  private whereQuery(
    query: SelectQueryBuilder<User>,
    params: Partial<User>,
    isFirst?: boolean,
  ) {
    const entries = Object.entries(params).reverse();

    if (isFirst) {
      const [key, param] = entries.pop();
      query.where(`user.${key} = :param`, { param });
    }

    while (entries.length > 0) {
      const [key, param] = entries.pop();
      query.andWhere(`user.${key} = :param`, { param });
    }

    return query;
  }

  selectByNotIdAndEmailQuery(id: number, email: string) {
    return this.queryBuilder
      .select()
      .where('user.id != :id', { id })
      .andWhere('user.email = :email', { email });
  }

  selectExcludeRoleTypeQuery(types: RoleType[], params?: Partial<User>) {
    const query = this.queryBuilder
      .select()
      .innerJoinAndSelect('user.roles', 'role')
      .innerJoinAndSelect('role.policy', 'policy')
      .where('role.type NOT IN (:types)', { types });

    return params ? this.whereQuery(query, params) : query;
  }

  selectWithRolesQuery(params?: Partial<User>) {
    const query = this.queryBuilder
      .select()
      .innerJoinAndSelect('user.roles', 'role')
      .innerJoinAndSelect('role.policy', 'policy');

    return params ? this.whereQuery(query, params, true) : query;
  }

  selectAllRelationQuery(params?: Partial<User>) {
    const query = this.queryBuilder
      .select()
      .innerJoinAndSelect('user.roles', 'role')
      .innerJoinAndSelect('role.policy', 'policy')
      .leftJoinAndSelect('user.teams', 'teams');

    return params ? this.whereQuery(query, params, true) : query;
  }
}
