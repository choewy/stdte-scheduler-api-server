import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { User } from '../entities';

export class IUserRepository {
  private target: Repository<User>;

  constructor(private dataSource: DataSource) {
    this.target = this.dataSource.getRepository(User);
  }

  async findOne(where: FindOptionsWhere<User>): Promise<User> {
    return await this.target.findOne({
      relations: { teams: true, roles: { rolePolicy: true } },
      where,
    });
  }

  async findMany(where: FindOptionsWhere<User> = {}): Promise<User[]> {
    return await this.target.find({
      relations: { teams: true, roles: { rolePolicy: true } },
      where,
    });
  }
}