import { ListResponseType } from '@/core/common';
import { TaskStatus, TaskType } from '@/core/typeorm/entities';
import { ApiResponseProperty, PickType } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TeamResponse {
  @ApiResponseProperty()
  @Expose()
  id: number;

  @ApiResponseProperty()
  @Expose()
  name: string;

  @ApiResponseProperty()
  @Expose()
  userCount: number;

  @ApiResponseProperty()
  @Expose()
  globalTaskCount: number;

  @ApiResponseProperty()
  @Expose()
  teamTaskCount: number;
}

export class TeamListResponse extends ListResponseType(TeamResponse) {}

export class TeamUserResponse {
  @ApiResponseProperty()
  @Expose()
  id: number;

  @ApiResponseProperty()
  @Expose()
  type: string;

  @ApiResponseProperty()
  @Expose()
  name: string;

  @ApiResponseProperty()
  @Expose()
  email: string;
}

export class TeamTaskResponse {
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
}

export class TeamDetailResponse extends PickType(TeamResponse, ['id', 'name']) {
  @ApiResponseProperty({
    type: [TeamUserResponse],
  })
  @Expose()
  users: TeamUserResponse[];

  @ApiResponseProperty({
    type: [TeamTaskResponse],
  })
  @Expose()
  tasks: TeamTaskResponse[];
}
