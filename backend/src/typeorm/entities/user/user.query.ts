import { DataSource, EntityManager, IsNull, SelectQueryBuilder } from 'typeorm';
import { createRepository } from '../helpers';
import { User } from './user.entity';
import { RoleAndUser } from '../role_and_user';

export class UserQuery {
  constructor(
    public base: DataSource | EntityManager,
    public repository = createRepository(base, User),
  ) {}

  private userWhere(
    query: SelectQueryBuilder<User>,
    whereStack: number,
    whereOptions: Partial<{
      uid: number;
      name: string;
      email: string;
    }>,
  ) {
    Object.entries(whereOptions).forEach(([key, value]) => {
      query[whereStack === 0 ? 'where' : 'andWhere']({
        [key]: value,
      });

      whereStack += 1;
    });

    return whereStack;
  }

  private withDeleteWhere(
    query: SelectQueryBuilder<User>,
    whereStack: number,
    withDeleted: boolean,
  ) {
    if (withDeleted) {
      return 0;
    }

    query[whereStack === 0 ? 'where' : 'andWhere']({
      deleted_at: IsNull(),
    });

    return 1;
  }

  async selectUsersExecute(withDeleted = false) {
    const query = this.repository
      .createQueryBuilder('user')
      .select()
      .innerJoinAndSelect('user.oauths', 'oauths', 'oauths.uid = user.uid');

    this.withDeleteWhere(query, 0, withDeleted);

    return await query.getMany();
  }

  async selectUserExecute(
    whereOptions: Partial<{
      uid: number;
      name: string;
      email: string;
    }>,
    withDeleted = false,
  ) {
    const query = this.repository
      .createQueryBuilder('user')
      .select()
      .leftJoinAndSelect('user.oauths', 'oauths', 'oauths.uid = user.uid');

    this.userWhere(
      query,
      this.withDeleteWhere(query, 0, withDeleted),
      whereOptions,
    );

    return await query.getOne();
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
}
