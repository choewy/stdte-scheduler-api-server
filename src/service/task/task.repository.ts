import { Task, Team, TeamAndTask } from '@/core/typeorm/entities';
import { Injectable } from '@nestjs/common';
import { DataSource, IsNull, Repository } from 'typeorm';

@Injectable()
export class TaskRepository {
  private readonly taskRepo: Repository<Task>;
  private readonly teamRepo: Repository<Team>;
  private readonly teamAndTaskRepo: Repository<TeamAndTask>;

  constructor(private readonly dataSource: DataSource) {
    this.taskRepo = this.dataSource.getRepository(Task);
    this.teamRepo = this.dataSource.getRepository(Team);
    this.teamAndTaskRepo = this.dataSource.getRepository(TeamAndTask);
  }

  async findAsList(): Promise<[number, Task[]]> {
    const builder = this.taskRepo
      .createQueryBuilder('task')
      .leftJoin(TeamAndTask, 'team_and_task', 'team_and_task.taskId = task.id')
      .leftJoinAndMapMany(
        'task.teams',
        Team,
        'teams',
        ['teams.id = team_and_task.teamId', 'teams.deletedAt IS NULL'].join(
          ' AND ',
        ),
      )
      .where('task.deletedAt IS NULL');

    return Promise.all([builder.getCount(), builder.getMany()]);
  }

  async findById(taskId: number): Promise<Task> {
    return this.taskRepo
      .createQueryBuilder('task')
      .leftJoin(TeamAndTask, 'team_and_task', 'team_and_task.taskId = task.id')
      .leftJoinAndMapMany(
        'task.teams',
        Team,
        'teams',
        ['teams.id = team_and_task.teamId', 'teams.deletedAt IS NULL'].join(
          ' AND ',
        ),
      )
      .where('task.deletedAt IS NULL')
      .andWhere('task.id = :taskId', { taskId })
      .getOne();
  }

  async findByCode(code: string): Promise<Task> {
    return this.taskRepo.findOneBy({
      code,
      deletedAt: IsNull(),
    });
  }

  async findTeamById(teamId: number): Promise<Team> {
    return this.teamRepo.findOneBy({
      id: teamId,
      deletedAt: IsNull(),
    });
  }

  async insertTaskAndTeam(taskId: number, teamId: number): Promise<void> {
    await this.teamAndTaskRepo.insert({ taskId, teamId });
  }

  async deleteTaskAndTeam(taskId: number, teamId: number): Promise<void> {
    await this.teamAndTaskRepo.delete({ taskId, teamId });
  }

  async saveOne(task: Partial<Task>): Promise<Task> {
    return this.taskRepo.save(task);
  }
}
