import { Injectable } from '@nestjs/common';
import {
  IRepositoryManager,
  RoleType,
  Role,
  Team,
  User,
  TeamStatus,
} from './typeorm/entities';

@Injectable()
export class CoreRepository extends IRepositoryManager {
  async findUser(type: RoleType): Promise<User> {
    return await this.user.selectIncludeRoleTypeQuery([type]).getOne();
  }

  async findRole(type: RoleType): Promise<Role> {
    return await this.role.selectIncludeRoleTypeQuery([type]).getOne();
  }

  async findTeam(status: TeamStatus): Promise<Team> {
    return await this.team.selectIncludeStatusQuery([status]).getOne();
  }

  async saveRole(role: Role | Partial<Role>): Promise<Role> {
    return await this.role.repository.save(role);
  }

  async saveTeam(team: Team | Partial<Team>): Promise<Team> {
    return await this.team.repository.save(team);
  }

  async saveUser(user: User | Partial<User>): Promise<User> {
    return await this.user.repository.save(user);
  }
}
