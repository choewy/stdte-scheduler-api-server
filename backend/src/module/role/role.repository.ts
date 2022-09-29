import {
  IRepositoryManager,
  Role,
  RoleType,
  User,
} from '@/core/typeorm/entities';
import { Injectable } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class RoleRepository extends IRepositoryManager {
  async findRole(params: Partial<Role>, types?: RoleType[]): Promise<Role> {
    const query = types
      ? this.role.selectExcludeRoleTypeQuery(types)
      : this.role.selectWithRolePolicyQuery();

    return await this.role.whereQuery(query, params, false).getOne();
  }

  async findRoles(types?: RoleType[]): Promise<Role[]> {
    const query = types
      ? this.role.selectWithRolePolicyQuery()
      : this.role.selectExcludeRoleTypeQuery(types);

    return await query.getMany();
  }

  async findUsersByRoleIds(roleIds: number[]): Promise<User[]> {
    return await this.user.selectByInRoleIdsQuery(roleIds).getMany();
  }

  async findUsersByUserIds(userIds: number[]): Promise<User[]> {
    return await this.user.selectByInIdsQuery(userIds).getMany();
  }

  async saveRole(role: Partial<Role>): Promise<Role> {
    return await this.role.repository.save(role);
  }

  async saveUsers(users: User[]): Promise<void> {
    await this.user.repository.save(users);
  }

  async deleteRole(params: FindOptionsWhere<Role>): Promise<void> {
    await this.role.repository.softDelete(params);
  }
}
