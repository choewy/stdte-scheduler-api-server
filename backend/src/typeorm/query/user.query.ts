import { DataSource, EntityManager, IsNull, SelectQueryBuilder } from 'typeorm';
import { createRepository } from './helpers';
import { User } from '../entities';

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
}
