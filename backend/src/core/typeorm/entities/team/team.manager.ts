import { QueryBuilder, Repository } from 'typeorm';
import { IManager } from '../abstract.manager';
import { Team } from './team.entity';

export class TeamManager extends IManager<Team> {
  get repository(): Repository<Team> {
    return this.dataSource.getRepository(Team);
  }

  get queryBuilder(): QueryBuilder<Team> {
    return this.dataSource.createQueryBuilder(Team, this.name);
  }

  selectByIdsQuery(ids: number[]) {
    return this.queryBuilder
      .select()
      .innerJoinAndSelect('team.teamSetting', 'teamSetting')
      .where('team.id IN (:ids)', { ids });
  }
}
