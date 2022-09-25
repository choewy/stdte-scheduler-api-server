import { DataSource, FindOptionsWhere, In, Repository } from 'typeorm';
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

  async findOneWithoutMaster(where: FindOptionsWhere<User>): Promise<User> {
    return await this.target.findOne({
      relations: { teams: true, roles: { rolePolicy: true } },
      where: {
        ...where,
        roles: [{ rolePolicy: { master: false } }],
      },
    });
  }

  async findMany(): Promise<User[]> {
    return await this.target.find({
      relations: { teams: true, roles: { rolePolicy: true } },
    });
  }

  async findManyByIds(ids: string[]): Promise<User[]> {
    return await this.target.find({
      relations: { teams: true, roles: { rolePolicy: true } },
      where: { id: In(ids) },
    });
  }

  async findManyWithoutMaster(): Promise<User[]> {
    return await this.target.find({
      relations: { teams: true, roles: { rolePolicy: true } },
      where: { roles: { rolePolicy: { master: false } } },
    });
  }
}
