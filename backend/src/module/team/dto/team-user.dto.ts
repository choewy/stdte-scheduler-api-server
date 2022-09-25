import { User } from '@/core/typeorm/entities';
import { ApiResponseProperty } from '@nestjs/swagger';
import { DateTimetoformat } from '@/appllication/transformer';
import { TeamUserRoleDto } from './team-user-role.dto';
import { Expose } from 'class-transformer';
import { DateTime } from 'luxon';

export class TeamUserDto {
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

  @ApiResponseProperty({ type: TeamUserRoleDto })
  @Expose()
  roles: TeamUserRoleDto[];

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
        this.roles = user.roles.map((role) => new TeamUserRoleDto(role));
      }
    }
  }
}
