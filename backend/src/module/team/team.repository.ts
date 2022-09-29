import { IRepositoryManager, Team, User } from '@/core/typeorm/entities';
import { Injectable } from '@nestjs/common';
import { FindOptionsWhere } from 'typeorm';

@Injectable()
export class TeamRepository extends IRepositoryManager {
  async findTeams(): Promise<Team[]> {
    return await this.team.selectAllRelationQuery().getMany();
  }

  async findTeam(params: Partial<Team>): Promise<Team> {
    const query = this.team.selectAllRelationQuery();
    return await this.team.whereQuery(query, params).getOne();
  }

  async findUsersByTeamIds(teamIds: number[]): Promise<User[]> {
    return await this.user.selectByInTeamIdsQuery(teamIds).getMany();
  }

  async fundUsersByUserIds(userIds: number[]): Promise<User[]> {
    return await this.user.selectByInIdsQuery(userIds).getMany();
  }

  async saveTeam(team: Partial<Team>): Promise<Team> {
    return await this.team.repository.save(team);
  }

  async saveUsers(users: User[]): Promise<void> {
    await this.user.repository.save(users);
  }

  async deleteTeam(params: FindOptionsWhere<Team>): Promise<void> {
    await this.team.repository.softDelete(params);
  }
}
