import { ListResponseType } from '@/core/common';
import { TaskStatus, TaskType } from '@/core/typeorm/entities';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TaskTeamResponse {
  @ApiResponseProperty()
  @Expose()
  id: number;

  @ApiResponseProperty()
  @Expose()
  name: string;
}

export class TaskResponse {
  @ApiResponseProperty()
  @Expose()
  id: number;

  @ApiResponseProperty()
  @Expose()
  type: TaskType;

  @ApiResponseProperty()
  @Expose()
  code: string;

  @ApiResponseProperty()
  @Expose()
  name: string;

  @ApiResponseProperty()
  @Expose()
  summary: string;

  @ApiResponseProperty()
  @Expose()
  revenue: string;

  @ApiResponseProperty()
  @Expose()
  status: TaskStatus;

  @ApiResponseProperty()
  @Expose()
  startAt: string;

  @ApiResponseProperty()
  @Expose()
  endAt: string;

  @ApiResponseProperty()
  @Expose()
  warrantyAt: string;

  @ApiResponseProperty()
  @Expose()
  createdAt: string;

  @ApiResponseProperty()
  @Expose()
  updatedAt: string;

  @ApiResponseProperty({
    type: [TaskTeamResponse],
  })
  @Expose()
  teams: TaskTeamResponse;
}

export class TaskListResponse extends ListResponseType(TaskResponse) {}
