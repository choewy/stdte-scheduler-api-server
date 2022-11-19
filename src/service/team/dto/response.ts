import { ListResponseType } from '@/core/common';
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
  count: number;
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

export class TeamDetailResponse extends PickType(TeamResponse, ['id', 'name']) {
  @ApiResponseProperty({
    type: [TeamUserResponse],
  })
  @Expose()
  users: TeamUserResponse[];
}
