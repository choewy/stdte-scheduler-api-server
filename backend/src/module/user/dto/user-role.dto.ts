import { Role } from '@/core/typeorm/entities';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { UserRolePolicyDto } from './user-role-policy.dto';

export class UserRoleDto {
  @ApiResponseProperty()
  @Expose()
  id: number;

  @ApiResponseProperty()
  @Expose()
  name: string;

  @ApiResponseProperty({ type: UserRolePolicyDto })
  policy: UserRolePolicyDto;

  constructor(role?: Role) {
    if (role) {
      this.id = role.id;
      this.name = role.name;

      if (role.rolePolicy) {
        this.policy = new UserRolePolicyDto(role.rolePolicy);
      }
    }
  }
}
