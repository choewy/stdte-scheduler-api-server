import { DataSource, EntityManager } from 'typeorm';
import { createRepository } from '../helpers';
import { User } from './user.entity';
import { RoleAndUser } from '../role_and_user';
import { UserWhereOptions } from './types';
import { Role } from '../role';
import { TeamAndUser } from '../team_and_user';

export class UserQuery {
  constructor(
    public base: DataSource | EntityManager,
    public repository = createRepository(base, User),
  ) {}

  selectUserOnlyQuery(whereOptions: UserWhereOptions) {
    const query = this.repository
      .createQueryBuilder('user')
      .select()
      .leftJoinAndSelect('user.oauths', 'oauths', 'oauths.uid = user.uid');

    if (whereOptions) {
      const { uid, name, email } = whereOptions;

      if (uid) {
        query.andWhere('user.uid = :uid', { uid });
      }

      if (name) {
        query.andWhere('user.name = :name', { name });
      }

      if (email) {
        query.andWhere('user.email = :email', { email });
      }
    }

    return query;
  }

  selectUserQuery(whereOptions: UserWhereOptions) {
    const subQuery = this.base
      .createQueryBuilder()
      .select('rid')
      .from(RoleAndUser, 'role_and_user')
      .where('role_and_user.uid = user.uid')
      .getQuery();

    const query = this.repository
      .createQueryBuilder('user')
      .select()
      .leftJoinAndMapMany(
        'user.roles',
        Role,
        'roles',
        `roles.rid IN (${subQuery})`,
      )
      .where('user.deleted_at IS NULL');

    if (whereOptions) {
      const { uid, name, email } = whereOptions;

      if (uid) {
        query.andWhere('user.uid = :uid', { uid });
      }

      if (name) {
        query.andWhere('user.name = :name', { name });
      }

      if (email) {
        query.andWhere('user.email = :email', { email });
      }
    }

    return query;
  }

  async selectUserByKeywordNotInRoleExecute(rid: number, keyword: string) {
    keyword = `%${keyword.trim()}%`;

    const subQuery = this.base
      .getRepository(RoleAndUser)
      .createQueryBuilder('role_and_user')
      .select('role_and_user.uid')
      .where(`role_and_user.rid = ${rid}`)
      .getQuery();

    const orWhereQuery = [
      'user.name LIKE :keyword',
      'user.email LIKE :keyword',
    ].join(' OR ');

    return await this.repository
      .createQueryBuilder('user')
      .select('user.uid', 'uid')
      .addSelect('user.name', 'name')
      .addSelect('user.email', 'email')
      .where('user.deleted_at IS NULL')
      .andWhere(`user.uid NOT IN (${subQuery})`)
      .andWhere(`(${orWhereQuery})`, { keyword })
      .limit(15)
      .getRawMany();
  }

  async selectUserByKeywordNotInTeamExecute(tid: number, keyword: string) {
    keyword = `%${keyword.trim()}%`;

    const subQuery = this.base
      .getRepository(TeamAndUser)
      .createQueryBuilder('team_and_user')
      .select('team_and_user.uid')
      .where(`team_and_user.tid = ${tid}`)
      .getQuery();

    const orWhereQuery = [
      'user.name LIKE :keyword',
      'user.email LIKE :keyword',
    ].join(' OR ');

    return await this.repository
      .createQueryBuilder('user')
      .select('user.uid', 'uid')
      .addSelect('user.name', 'name')
      .addSelect('user.email', 'email')
      .where('user.deleted_at IS NULL')
      .andWhere(`user.uid NOT IN (${subQuery})`)
      .andWhere(`(${orWhereQuery})`, { keyword })
      .limit(15)
      .getRawMany();
  }
}
