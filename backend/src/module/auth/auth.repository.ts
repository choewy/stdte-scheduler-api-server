import { localDateTime } from '@/core/datetime';
import { RoleType, User, UserStatus } from '@/core/typeorm/entities';
import { BaseRepository } from '@/core/typeorm/repositories';
import { Injectable } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class AuthRepository extends BaseRepository {
  async findUser({ username }: FindOptionsWhere<User>): Promise<User> {
    return await this.methods.user.findOne({ username });
  }

  async createOne(user: Partial<User>): Promise<User> {
    const roles = await this.methods.role.findMany({
      type: RoleType.Default,
    });

    const teams = await this.methods.team.findMany({
      default: true,
    });

    return await this.targets.user.save(
      Object.assign<Partial<User>, Partial<User>>(user, {
        status: UserStatus.Wait,
        disabledAt: localDateTime(),
        roles,
        teams,
      }),
    );
  }
}
