import { Injectable } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';
import {
  Role,
  RolePolicy,
  RoleType,
  Team,
  User,
  UserStatus,
} from './typeorm/entities';
import { BaseRepository } from './typeorm/repositories/base.repository';

@Injectable()
export class CoreRepository extends BaseRepository {
  async findRole(where: FindOptionsWhere<Role>): Promise<Role> {
    return await this.methods.role.findOne(where);
  }

  async findUser(type: RoleType): Promise<User> {
    return await this.targets.user
      .createQueryBuilder('user')
      .select()
      .innerJoinAndSelect('user.roles', 'roles', 'roles.type = :type', { type })
      .getOne();
  }

  async createRole(
    data: Partial<Role>,
    policy: Partial<RolePolicy>,
  ): Promise<void> {
    return await this.transaction(async () => {
      let role = await this.targets.role
        .createQueryBuilder('role')
        .select()
        .innerJoinAndSelect('role.policy', 'policy')
        .where('role.type = :type', { type: data.type })
        .getOne();

      if (!role) {
        role = await this.targets.role.save(data);
        role.policy = new RolePolicy();
        role.policy.roleId = role.id;
        role.policy.read = policy.read;
        role.policy.write = policy.write;
        role.policy.update = policy.update;
        role.policy.delete = policy.delete;
        await this.targets.role.save(role);
      }
    });
  }

  async createTeam(data: Partial<Team>): Promise<void> {
    return await this.transaction(async () => {
      const team = await this.methods.team.findOne({ default: true });

      if (!team) {
        await this.targets.team.save(data);
      }
    });
  }

  async createUser(data: Partial<User>, type: RoleType): Promise<void> {
    return await this.transaction(async () => {
      const user = await this.methods.user.findOne({
        roles: { type },
      });

      if (!user) {
        const role = await this.methods.role.findOne({ type });
        await this.targets.user.save(
          Object.assign(data, {
            status: UserStatus.Enable,
            roles: [role],
          }),
        );
      }
    });
  }
}
