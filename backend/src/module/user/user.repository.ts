import {
  IRepositoryManager,
  Role,
  RoleType,
  Team,
  User,
} from '@/core/typeorm/entities';
import { Injectable } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class UserRepository extends IRepositoryManager {
  async findUser(params: Partial<User>, roleTypes?: RoleType[]): Promise<User> {
    const query = roleTypes
      ? this.user.selectExcludeRoleTypeQuery(roleTypes, params)
      : this.user.selectWithRolesQuery(params);

    return query.getOne();
  }

  async findUsers(roleTypes?: RoleType[]): Promise<User[]> {
    const query = roleTypes
      ? this.user.selectExcludeRoleTypeQuery(roleTypes)
      : this.user.selectWithRolesQuery();

    return await query.getMany();
  }

  async findUserByNotIdAndEmail({
    id,
    email,
  }: {
    id: number;
    email: string;
  }): Promise<User> {
    return await this.user.selectByNotIdAndEmailQuery(id, email).getOne();
  }

  async findRolesByIds(ids: number[]): Promise<Role[]> {
    return await this.role.selectByIdsQuery(ids).getMany();
  }

  async findTeamsByIds(ids: number[]): Promise<Team[]> {
    return await this.team.selectByIdsQuery(ids).getMany();
  }

  async saveUser(user: Partial<User>): Promise<void> {
    await this.user.repository.save(user);
  }

  async deleteUser(params: FindOptionsWhere<User>): Promise<void> {
    await this.user.repository.softDelete(params);
  }
}
