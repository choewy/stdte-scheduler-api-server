import { RoleType, User, UserStatus } from '@/core/typeorm/entities';
import { BaseRepository } from '@/core/typeorm/repositories';
import { Injectable } from '@nestjs/common';
import { FindOptionsWhere, In, Not } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository {
  async findMany(includeMaster?: boolean): Promise<User[]> {
    return includeMaster
      ? await this.methods.user.findMany()
      : await this.methods.user.findMany({
          roles: { type: Not(RoleType.Master) },
        });
  }

  async findOne(
    { id, email }: FindOptionsWhere<User>,
    includeMaster?: boolean,
  ): Promise<User> {
    return includeMaster
      ? await this.methods.user.findOne({ id, email })
      : await this.methods.user.findOne({
          id,
          email,
          roles: { type: Not(RoleType.Master) },
        });
  }

  async createOne(
    user: Partial<User>,
    roleIds: number[],
    teamIds: number[],
  ): Promise<void> {
    user.roles = roleIds
      ? await this.methods.role.findMany({ id: In(roleIds) })
      : await this.methods.role.findMany({ type: RoleType.Default });

    user.teams = teamIds
      ? await this.methods.team.findMany({ id: In(teamIds) })
      : await this.methods.team.findMany({ default: true });

    await this.targets.user.save(
      Object.assign<Partial<User>, Partial<User>>(user, {
        status: UserStatus.Wait,
        disabledAt: null,
      }),
    );
  }

  async saveOne(user: Partial<User>): Promise<void> {
    await this.targets.user.save(user);
  }

  async deleteOne(id: number): Promise<void> {
    await this.targets.user.softDelete({ id });
  }
}
