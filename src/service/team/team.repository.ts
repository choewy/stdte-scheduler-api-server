import {
  Task,
  Team,
  TeamAndTask,
  TeamAndUser,
  User,
} from '@/core/typeorm/entities';
import { Injectable } from '@nestjs/common';
import { DateTime } from 'luxon';
import { DataSource, IsNull, Not, Repository } from 'typeorm';

@Injectable()
export class TeamRepository {
  private readonly teamRepo: Repository<Team>;
  private readonly userRepo: Repository<User>;
  private readonly teamAndUserRepo: Repository<TeamAndUser>;

  constructor(private readonly dataSource: DataSource) {
    this.teamRepo = this.dataSource.getRepository(Team);
    this.userRepo = this.dataSource.getRepository(User);
    this.teamAndUserRepo = this.dataSource.getRepository(TeamAndUser);
  }

  async findAsList(): Promise<[number, Team[]]> {
    const builder = this.teamRepo
      .createQueryBuilder('team')
      .leftJoin(TeamAndUser, 'team_and_user', 'team_and_user.teamId = team.id')
      .leftJoinAndMapMany(
        'team.users',
        User,
        'users',
        ['users.id = team_and_user.userId', 'users.deletedAt IS NULL'].join(
          ' AND ',
        ),
      )
      .leftJoin(TeamAndTask, 'team_and_task', 'team_and_task.teamId = team.id')
      .leftJoinAndMapMany(
        'team.tasks',
        Task,
        'tasks',
        [
          'tasks.deletedAt IS NULL',
          '(tasks.id = team_and_task.taskId OR tasks.type = "global")',
        ].join(' AND '),
      )
      .where('team.deletedAt IS NULL');

    return Promise.all([builder.getCount(), builder.getMany()]);
  }

  async findById(teamId: number): Promise<Team> {
    return this.teamRepo
      .createQueryBuilder('team')
      .leftJoin(TeamAndUser, 'team_and_user', 'team_and_user.teamId = team.id')
      .leftJoinAndMapMany(
        'team.users',
        User,
        'users',
        ['users.id = team_and_user.userId', 'users.deletedAt IS NULL'].join(
          ' AND ',
        ),
      )
      .leftJoin(TeamAndTask, 'team_and_task', 'team_and_task.teamId = team.id')
      .leftJoinAndMapMany(
        'team.tasks',
        Task,
        'tasks',
        [
          'tasks.deletedAt IS NULL',
          '(tasks.id = team_and_task.taskId OR tasks.type = "global")',
        ].join(' AND '),
      )
      .where('team.deletedAt IS NULL')
      .andWhere('team.id = :teamId', { teamId })
      .orderBy('tasks.id', 'ASC')
      .addOrderBy('users.name', 'ASC')
      .getOne();
  }

  async findByName(name: string): Promise<Team> {
    return this.teamRepo.findOneBy({
      name,
      deletedAt: IsNull(),
    });
  }

  async findByNameOmitId(teamId: number, name: string): Promise<Team> {
    return this.teamRepo.findOneBy({
      name,
      id: Not(teamId),
      deletedAt: IsNull(),
    });
  }

  async findUserById(userId: number): Promise<User> {
    return this.userRepo.findOneBy({
      id: userId,
      deletedAt: IsNull(),
    });
  }

  async insertTeamAndUser(teamId: number, userId: number): Promise<void> {
    await this.teamAndUserRepo.insert({ teamId, userId });
  }

  async deleteTeamAndUser(teamId: number, userId: number): Promise<void> {
    await this.teamAndUserRepo.delete({ teamId, userId });
  }

  async saveOne(team: Partial<Team>): Promise<Team> {
    return this.teamRepo.save(team);
  }

  async deleteById(teamId: number): Promise<void> {
    return this.dataSource.transaction(async (em) => {
      await em.getRepository(TeamAndUser).delete({ teamId });
      await em
        .getRepository(Team)
        .update({ id: teamId }, { deletedAt: DateTime.local() });
    });
  }
}
