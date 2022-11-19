import { Task, TaskType } from '@/core/typeorm/entities';
import { Injectable } from '@nestjs/common';
import { plainToInstance } from 'class-transformer';
import {
  CreateTaskBody,
  TaskListResponse,
  TaskResponse,
  TaskTeamMethod,
  TaskTeamResponse,
} from './dto';
import {
  AlreadyExistTaskCodeException,
  CannotAddOrRemoveTeamGlobalTaskEXception,
  NotFoundTaskException,
  NotFoundTeamException,
} from './exceptions';
import { TaskRepository } from './task.repository';

@Injectable()
export class TaskService {
  constructor(private readonly repository: TaskRepository) {}

  async getTaskList() {
    const [count, rows] = await this.repository.findAsList();

    const res = new TaskListResponse();

    res.count = count;
    res.rows = plainToInstance(
      TaskResponse,
      rows.map(
        ({
          createdAt,
          updatedAt,
          startAt,
          endAt,
          warrantyAt,
          teams,
          ...row
        }) => {
          return Object.assign(row, {
            startAt: startAt?.toISODate() || null,
            endAt: endAt?.toISODate() || null,
            warrantyAt: warrantyAt?.toISODate() || null,
            createdAt: createdAt.toISODate(),
            updatedAt: updatedAt.toISODate(),
            deletedAt: null,
            teams: plainToInstance(
              TaskTeamResponse,
              teams.map(({ id, name }) => ({
                id,
                name,
              })),
            ),
          });
        },
      ),
    );

    return res;
  }

  async createTask(body: CreateTaskBody): Promise<void> {
    if (await this.repository.findByCode(body.code)) {
      throw new AlreadyExistTaskCodeException();
    }

    await this.repository.saveOne(
      Object.assign(new Task(), {
        type: body.type,
        code: body.code,
        name: body.name,
        summary: body.summary,
        revenue: body.revenue,
        status: body.status,
        startAt: body.startAt,
        endAt: body.endAt,
        warrantyAt: body.warrantyAt,
      }),
    );
  }

  async updateTaskTeam(
    taskId: number,
    method: TaskTeamMethod,
    teamId: number,
  ): Promise<void> {
    const [task, team] = await Promise.all([
      this.repository.findById(taskId),
      this.repository.findTeamById(teamId),
    ]);

    if (!task) {
      throw new NotFoundTaskException();
    }

    if (!team) {
      throw new NotFoundTeamException();
    }

    if (task.type === TaskType.Global) {
      throw new CannotAddOrRemoveTeamGlobalTaskEXception();
    }

    switch (method) {
      case TaskTeamMethod.Append:
        if (task.teams.map(({ id }) => id).includes(teamId)) {
          return;
        }

        return this.repository.insertTaskAndTeam(taskId, teamId);

      case TaskTeamMethod.Remove:
        if (!task.teams.map(({ id }) => id).includes(teamId)) {
          return;
        }

        return this.repository.deleteTaskAndTeam(taskId, teamId);
    }
  }
}
