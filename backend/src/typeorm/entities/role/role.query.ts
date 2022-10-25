import { DataSource, EntityManager } from 'typeorm';
import { createRepository } from '../helpers';
import { RoleAndUser } from '../role_and_user';
import { User } from '../user';
import { Role } from './role.entity';
import { RoleWhereOptions } from './types';

export class RoleQuery {
  constructor(
    public readonly base: DataSource | EntityManager,
    public readonly repository = createRepository(base, Role),
  ) {}

  selectRoleQuery(whereOptions?: RoleWhereOptions) {
    const subQuery = this.base
      .createQueryBuilder()
      .select('uid')
      .from(RoleAndUser, 'role_and_user')
      .where('role_and_user.rid = role.rid')
      .getQuery();

    const query = this.repository
      .createQueryBuilder('role')
      .select()
      .leftJoinAndMapMany(
        'role.users',
        User,
        'users',
        `users.uid IN (${subQuery})`,
      )
      .where('role.is_admin IS FALSE');

    if (whereOptions) {
      const { rid, name } = whereOptions;

      if (rid) {
        query.andWhere('role.rid = :rid', { rid });
      }

      if (name) {
        query.andWhere('role.name = :name', { name });
      }
    }

    return query;
  }

  async selectRolesExecute() {
    const subQuery = this.base
      .createQueryBuilder()
      .select('uid')
      .from(RoleAndUser, 'role_and_user')
      .where('role_and_user.rid = role.rid')
      .getQuery();

    return await this.repository
      .createQueryBuilder('role')
      .select()
      .leftJoinAndMapMany(
        'role.users',
        User,
        'users',
        `users.uid IN (${subQuery})`,
      )
      .where('role.is_admin IS FALSE')
      .getMany();
  }
}
