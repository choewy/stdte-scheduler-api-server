import { DateTimetoformat } from '@/appllication/transformer';
import { ApiResponseProperty } from '@nestjs/swagger';
import { User } from '@/core/typeorm/entities';
import { Expose } from 'class-transformer';
import { DateTime } from 'luxon';
import { UserRoleDto } from './user-role.dto';
import { UserTeamDto } from './user-team.dto';

export class UserDto {
  @ApiResponseProperty()
  @Expose()
  id: number;

  @ApiResponseProperty()
  @Expose()
  username: string;

  @ApiResponseProperty()
  @Expose()
  nickname: string;

  @ApiResponseProperty()
  @Expose()
  email: string;

  @ApiResponseProperty()
  @Expose()
  status: boolean;

  @ApiResponseProperty({ type: [UserRoleDto] })
  @Expose()
  roles: UserRoleDto[];

  @ApiResponseProperty({ type: [UserTeamDto] })
  @Expose()
  teams: UserTeamDto[];

  @ApiResponseProperty()
  @DateTimetoformat()
  @Expose()
  createdAt: DateTime;

  @ApiResponseProperty()
  @DateTimetoformat()
  @Expose()
  updatedAt: DateTime;

  @ApiResponseProperty()
  @DateTimetoformat()
  @Expose()
  disabledAt: DateTime;

  constructor(user?: User) {
    if (user) {
      this.id = user.id;
      this.username = user.username;
      this.nickname = user.nickname;
      this.email = user.email;
      this.status = user.status;
      this.createdAt = user.createdAt;
      this.updatedAt = user.updatedAt;
      this.disabledAt = user.disabledAt;

      if (user.roles) {
        this.roles = user.roles.map((role) => new UserRoleDto(role));
      }

      if (user.teams) {
        this.teams = user.teams.map((team) => new UserTeamDto(team));
      }
    }
  }
}
