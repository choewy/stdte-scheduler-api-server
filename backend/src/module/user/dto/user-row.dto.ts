import { DateTimetoformat } from '@/appllication/transformer';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserTeamDto } from './user-team.dto';
import { UserRoleDto } from './user-role.dto';
import { DateTime } from 'luxon';
import { User } from '@/core/typeorm/entities';

export class UserRowDto {
  @ApiResponseProperty()
  @Expose()
  id: number;

  @ApiResponseProperty()
  @Expose()
  username: string;

  @ApiResponseProperty()
  @Expose()
  email: string;

  @ApiResponseProperty()
  @Expose()
  nickname: string;

  @ApiResponseProperty()
  @Expose()
  status: boolean;

  @ApiResponseProperty({ type: [UserRoleDto] })
  @Expose()
  roles: UserRoleDto[];

  @ApiResponseProperty({ type: [UserTeamDto] })
  @Expose()
  teams: UserTeamDto[];

  @ApiResponseProperty({ type: 'string' })
  @DateTimetoformat()
  @Expose()
  createdAt: DateTime;

  @ApiResponseProperty({ type: 'string' })
  @DateTimetoformat()
  @Expose()
  updatedAt: DateTime;

  @ApiResponseProperty({ type: 'string' })
  @DateTimetoformat()
  @Expose()
  disabledAt: DateTime;

  constructor(user?: Partial<User>) {
    if (user) {
      this.id = user.id;
      this.username = user.username;
      this.email = user.email;
      this.nickname = user.nickname;
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
