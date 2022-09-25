import { Injectable } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';
import { Role, RolePolicy, Team, User } from './typeorm/entities';
import { BaseRepository } from './typeorm/repositories/base.repository';

@Injectable()
export class CoreRepository extends BaseRepository {
  async findRole(where: FindOptionsWhere<Role>): Promise<Role> {
    return await this.methods.role.findOne(where);
  }

  async findUser(where: FindOptionsWhere<User>): Promise<User> {
    return await this.methods.user.findOne(where);
  }

  async createRole(
    data: Partial<Role>,
    policy: FindOptionsWhere<RolePolicy>,
  ): Promise<void> {
    return await this.transaction(async () => {
      let role = await this.methods.role.findOne({ rolePolicy: policy });

      if (!role) {
        role = await this.targets.role.save(data);
      }

      await this.targets.role.save(
        Object.assign(role, {
          rolePolicy: {
            roleId: role.id,
            ...policy,
          },
        }),
      );
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

  async createUser(
    data: Partial<User>,
    policy: FindOptionsWhere<RolePolicy>,
  ): Promise<void> {
    return await this.transaction(async () => {
      const role = await this.methods.role.findOne({ rolePolicy: policy });
      await this.targets.user.save(Object.assign(data, { roles: [role] }));
    });
  }
}
