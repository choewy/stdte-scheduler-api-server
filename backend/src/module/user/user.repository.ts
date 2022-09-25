import { User } from '@/core/typeorm/entities';
import { BaseRepository } from '@/core/typeorm/repositories';
import { Injectable } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class UserRepository extends BaseRepository {
  async findMany(includeMaster?: boolean): Promise<User[]> {
    return includeMaster
      ? await this.methods.user.findMany()
      : await this.methods.user.findManyWithoutMaster();
  }

  async findOne(
    { id, email }: FindOptionsWhere<User>,
    includeMaster?: boolean,
  ): Promise<User> {
    return includeMaster
      ? await this.methods.user.findOne({ id, email })
      : await this.methods.user.findOneWithoutMaster({ id, email });
  }

  async createOne(
    user: Partial<User>,
    roleIds: number[],
    teamIds: number[],
  ): Promise<void> {
    user.roles = roleIds
      ? await this.methods.role.findManyByIds(roleIds)
      : await this.methods.role.findDefaultAsArray();

    user.teams = teamIds
      ? await this.methods.team.findManyByIds(teamIds)
      : await this.methods.team.findDefaultAsArray();

    await this.targets.user.save(
      Object.assign<Partial<User>, Partial<User>>(user, {
        status: true,
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
