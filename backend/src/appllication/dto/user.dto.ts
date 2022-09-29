import { DateTimetoformat } from '@/appllication/transformer';
import { ApiResponseProperty } from '@nestjs/swagger';
import { User, UserStatus } from '@/core/typeorm/entities';
import { Expose } from 'class-transformer';
import { DateTime } from 'luxon';
import { RoleDto } from './role.dto';
import { TeamDto } from './team.dto';

export class UserDto {
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

  @ApiResponseProperty({ type: 'string' })
  @Expose()
  status: UserStatus;

  @ApiResponseProperty({ type: [RoleDto] })
  @Expose()
  roles?: RoleDto[];

  @ApiResponseProperty({ type: [TeamDto] })
  @Expose()
  teams?: TeamDto[];

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

  constructor(user?: Partial<User>) {
    if (user) {
      this.id = user.id;
      this.username = user.username;
      this.email = user.email;
      this.nickname = user.nickname;
      this.status = user.status;
      this.createdAt = user.createdAt;
      this.updatedAt = user.updatedAt;

      if (user.roles) {
        this.roles = user.roles.map((role) => new RoleDto(role));
      }

      if (user.teams) {
        this.teams = user.teams.map((team) => new TeamDto(team));
      }
    }
  }
}
