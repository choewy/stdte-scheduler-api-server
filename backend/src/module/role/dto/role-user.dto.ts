import { User, UserStatus } from '@/core/typeorm/entities';
import { DateTimetoformat } from '@/appllication/transformer';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { DateTime } from 'luxon';

export class RoleUserDto {
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

  @ApiResponseProperty({ enum: UserStatus })
  @Expose()
  status: UserStatus;

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
    }
  }
}
