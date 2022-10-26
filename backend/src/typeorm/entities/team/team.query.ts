import { DataSource, EntityManager } from 'typeorm';
import { LockMode } from '../enums';
import { createRepository } from '../helpers';
import { TeamAndUser } from '../team_and_user';
import { User } from '../user';
import { Team } from './team.entity';
import { TeamWhereOptions } from './types';

export class TeamQuery {
  constructor(
    public readonly base: DataSource | EntityManager,
    public readonly repository = createRepository(base, Team),
  ) {}

  selectTeamQuery(
    whereOptions?: TeamWhereOptions,
    lock = false,
    lockMode = LockMode.PerssimisticWrite,
  ) {
    const subQuery = this.base
      .createQueryBuilder()
      .select('uid')
      .from(TeamAndUser, 'team_and_user')
      .where('team_and_user.tid = team.tid')
      .getQuery();

    const query = this.repository
      .createQueryBuilder('team')
      .select()
      .leftJoinAndMapMany(
        'team.members',
        User,
        'members',
        `members.uid IN (${subQuery})`,
      )
      .where('team.deleted_at IS NULL');

    if (whereOptions) {
      const { tid, name } = whereOptions;

      if (tid) {
        query.andWhere('team.tid = :tid', { tid });
      }

      if (name) {
        query.andWhere('team.name = :name', { name });
      }
    }

    if (lock) {
      query.setLock(lockMode);
    }

    return query;
  }
}
