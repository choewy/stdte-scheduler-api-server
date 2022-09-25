import { DataSource, FindOptionsWhere, In, Repository } from 'typeorm';
import { Role } from '../entities';

export class IRoleRepository {
  private target: Repository<Role>;

  constructor(private dataSource: DataSource) {
    this.target = this.dataSource.getRepository(Role);
  }

  async findOne(where: FindOptionsWhere<Role>): Promise<Role> {
    return await this.target.findOne({
      relations: { rolePolicy: true },
      where,
    });
  }

  async findMany(where: FindOptionsWhere<Role>): Promise<Role[]> {
    return await this.target.find({
      relations: { rolePolicy: true },
      where,
    });
  }

  async findDefault() {
    return await this.target.findOne({
      relations: { rolePolicy: true },
      where: { rolePolicy: { default: true } },
    });
  }

  async findMaster() {
    return await this.target.findOne({
      relations: { rolePolicy: true },
      where: { rolePolicy: { master: true } },
    });
  }

  async findDefaultAsArray() {
    return await this.target.find({
      relations: { rolePolicy: true },
      where: { rolePolicy: { default: true } },
    });
  }

  async findManyByIds(ids: number[]): Promise<Role[]> {
    return await this.target.find({
      relations: { rolePolicy: true },
      where: { id: In(ids) },
    });
  }
}
