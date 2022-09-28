import { RolePolicyDto } from '@/appllication/dto/role-policy.dto';
import { DateTimetoformat } from '@/appllication/transformer';
import { Role, RoleType, User } from '@/core/typeorm/entities';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { DateTime } from 'luxon';
import { RoleUserDto } from './role-user.dto';

export class RoleRowDto {
  @ApiResponseProperty()
  @Expose()
  id: number;

  @ApiResponseProperty()
  @Expose()
  name: string;

  @ApiResponseProperty({ enum: RoleType })
  @Expose()
  type: RoleType;

  @ApiResponseProperty({ type: RolePolicyDto })
  @Expose()
  policy: RolePolicyDto;

  @ApiResponseProperty({ type: [RoleUserDto] })
  @Expose()
  users: RoleUserDto[];

  @ApiResponseProperty({ type: 'string' })
  @DateTimetoformat()
  @Expose()
  createdAt: DateTime;

  @ApiResponseProperty({ type: 'string' })
  @DateTimetoformat()
  @Expose()
  updatedAt: DateTime;

  constructor(role?: Partial<Role>, users?: Partial<User>[]) {
    if (role) {
      this.id = role.id;
      this.name = role.name;
      this.type = role.type;
      this.createdAt = role.createdAt;
      this.updatedAt = role.updatedAt;

      if (role.policy) {
        this.policy = new RolePolicyDto(role.policy);
      }

      if (users) {
        this.users = users.map((user) => {
          delete user.roles;
          delete user.teams;

          return new RoleUserDto(user);
        });
      }
    }
  }
}
