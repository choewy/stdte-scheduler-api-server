import { RolePolicy } from '@/core/typeorm';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRolePolicyDto {
  @ApiResponseProperty()
  @Expose()
  default: boolean;

  @ApiResponseProperty()
  @Expose()
  master: boolean;

  @ApiResponseProperty()
  @Expose()
  admin: boolean;

  @ApiResponseProperty()
  @Expose()
  manager: boolean;

  @ApiResponseProperty()
  @Expose()
  member: boolean;

  constructor(rolePolicy?: RolePolicy) {
    if (rolePolicy) {
      this.default = rolePolicy.default;
      this.master = rolePolicy.master;
      this.admin = rolePolicy.admin;
      this.manager = rolePolicy.manager;
      this.member = rolePolicy.member;
    }
  }
}
