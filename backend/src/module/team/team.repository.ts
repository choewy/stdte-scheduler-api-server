import { Team, User } from '@/core/typeorm/entities';
import { BaseRepository } from '@/core/typeorm/repositories';
import { Injectable } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class TeamRepository extends BaseRepository {
  async findOne(where: FindOptionsWhere<Team>): Promise<Team> {
    return await this.methods.team.findOne(where);
  }

  async findMany(where?: FindOptionsWhere<Team>): Promise<Team[]> {
    return await this.methods.team.findMany(where);
  }

  async findUsers(where: FindOptionsWhere<User>): Promise<User[]> {
    return await this.methods.user.findMany(where);
  }

  async saveOne(team: Partial<Team>): Promise<void> {
    await this.targets.team.save(team);
  }

  async saveUsers(users: User[]): Promise<void> {
    await this.targets.user.save(users);
  }

  async deleteOne({ id }: Partial<Team>): Promise<void> {
    await this.targets.team.softDelete({ id });
  }
}
