import { DataSource, FindOptionsWhere, In, Repository } from 'typeorm';
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

  async findDefault(): Promise<Team> {
    return await this.target.findOne({
      where: { default: true },
    });
  }

  async findDefaultAsArray(): Promise<Team[]> {
    return await this.target.find({
      where: { default: true },
    });
  }

  async findManyByIds(ids: number[]): Promise<Team[]> {
    return await this.target.find({
      where: { id: In(ids) },
    });
  }
}
