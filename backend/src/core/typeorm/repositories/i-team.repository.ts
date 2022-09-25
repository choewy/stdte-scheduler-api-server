import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { Team } from '../entities';

export class ITeamRepository {
  private target: Repository<Team>;

  constructor(private dataSource: DataSource) {
    this.target = this.dataSource.getRepository(Team);
  }

  async findOne(where: FindOptionsWhere<Team>): Promise<Team> {
    return await this.target.findOne({ where });
  }

  async findMany(where: FindOptionsWhere<Team>): Promise<Team[]> {
    return await this.target.find({ where });
  }
}
