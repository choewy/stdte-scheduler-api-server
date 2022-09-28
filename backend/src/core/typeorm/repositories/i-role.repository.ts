import { DataSource, FindOptionsWhere, Repository } from 'typeorm';
import { Role } from '../entities';

export class IRoleRepository {
  private target: Repository<Role>;

  constructor(private dataSource: DataSource) {
    this.target = this.dataSource.getRepository(Role);
  }

  async findOne(where: FindOptionsWhere<Role>): Promise<Role> {
    return await this.target.findOne({
      relations: { policy: true },
      where,
    });
  }

  async findMany(where: FindOptionsWhere<Role>): Promise<Role[]> {
    return await this.target.find({
      relations: { policy: true },
      where,
    });
  }
}
