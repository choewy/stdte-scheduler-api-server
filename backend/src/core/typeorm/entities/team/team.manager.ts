import { QueryBuilder, Repository, SelectQueryBuilder } from 'typeorm';
import { IManager } from '../abstract.manager';
import { Team, TeamStatus } from './team.entity';

export class TeamManager extends IManager<Team> {
  get repository(): Repository<Team> {
    return this.dataSource.getRepository(Team);
  }

  get queryBuilder(): QueryBuilder<Team> {
    return this.dataSource.createQueryBuilder(Team, this.name);
  }

  whereQuery(
    query: SelectQueryBuilder<Team>,
    params: Partial<Team>,
    isFirst?: boolean,
  ) {
    const entries = Object.entries(params).reverse();

    if (isFirst) {
      const [key, param] = entries.pop();
      query.where(`team.${key} = :param`, { param });
    }

    while (entries.length > 0) {
      const [key, param] = entries.pop();
      query.andWhere(`team.${key} = :param`, { param });
    }

    return query;
  }

  selectAllRelationQuery() {
    return this.queryBuilder
      .select()
      .innerJoinAndSelect('team.setting', 'setting');
  }

  selectByIdsQuery(ids: number[]) {
    return this.queryBuilder
      .select()
      .innerJoinAndSelect('team.setting', 'setting')
      .where('team.id IN (:ids)', { ids });
  }

  selectIncludeStatusQuery(status: TeamStatus[]) {
    return this.queryBuilder
      .select()
      .innerJoinAndSelect('team.setting', 'setting')
      .where('team.status IN (:status)', { status });
  }

  selectExcludeStatusQuey(status: TeamStatus[]) {
    return this.queryBuilder
      .select()
      .innerJoinAndSelect('team.setting', 'setting')
      .where('team.status NOT IN (:status)', { status });
  }
}
