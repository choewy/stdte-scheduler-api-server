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

  whereQuery(
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

  selectIncludeRoleTypeQuery(types: RoleType[], params?: Partial<User>) {
    const query = this.queryBuilder
      .select()
      .innerJoinAndSelect('user.roles', 'role')
      .innerJoinAndSelect('role.policy', 'policy')
      .where('role.type IN (:types)', { types });

    return params ? this.whereQuery(query, params) : query;
  }

  selectExcludeRoleTypeQuery(types: RoleType[], params?: Partial<User>) {
    const query = this.queryBuilder
      .select()
      .innerJoinAndSelect('user.roles', 'role')
      .innerJoinAndSelect('role.policy', 'policy')
      .leftJoinAndSelect('user.teams', 'team')
      .leftJoinAndSelect('team.setting', 'setting')
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
      .leftJoinAndSelect('user.teams', 'team')
      .leftJoinAndSelect('team.setting', 'setting');

    return params ? this.whereQuery(query, params, true) : query;
  }

  selectByInIdsQuery(ids: number[]) {
    const query = this.queryBuilder
      .select()
      .innerJoinAndSelect('user.roles', 'role')
      .innerJoinAndSelect('role.policy', 'policy')
      .leftJoinAndSelect('user.teams', 'team')
      .leftJoinAndSelect('team.setting', 'setting');

    return ids.length ? query.where('user.id IN (:ids)', { ids }) : query;
  }

  selectByInRoleIdsQuery(ids: number[]) {
    const query = this.queryBuilder
      .select()
      .innerJoinAndSelect('user.roles', 'role')
      .innerJoinAndSelect('role.policy', 'policy')
      .leftJoinAndSelect('user.teams', 'team')
      .leftJoinAndSelect('team.setting', 'setting');

    return ids.length ? query.where('role.id IN (:ids)', { ids }) : query;
  }

  selectByInTeamIdsQuery(ids: number[]) {
    const query = this.queryBuilder
      .select()
      .innerJoinAndSelect('user.roles', 'role')
      .innerJoinAndSelect('role.policy', 'policy')
      .leftJoinAndSelect('user.teams', 'team')
      .leftJoinAndSelect('team.setting', 'setting');

    return ids.length ? query.where('team.id IN ( :ids )', { ids }) : query;
  }
}
