import {
  IRepositoryManager,
  Role,
  RoleType,
  Team,
  TeamStatus,
  User,
} from '@/core/typeorm/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository extends IRepositoryManager {
  async findUser(params: Partial<User>): Promise<User> {
    return await this.user.selectAllRelationQuery(params).getOne();
  }

  async findRoles(types: RoleType[]): Promise<Role[]> {
    return await this.role.selectIncludeRoleTypeQuery(types).getMany();
  }

  async findTeams(status: TeamStatus[]): Promise<Team[]> {
    return await this.team.selectIncludeStatusQuery(status).getMany();
  }

  async saveUser(user: Partial<User>): Promise<User> {
    return await this.user.repository.save(user);
  }
}
