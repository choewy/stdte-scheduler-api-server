import { RolePolicyDto } from '@/appllication/dto';
import { Role, RoleType } from '@/core/typeorm/entities';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserRoleDto {
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

  constructor(role?: Partial<Role>) {
    if (role) {
      this.id = role.id;
      this.name = role.name;
      this.type = role.type;

      if (role.policy) {
        this.policy = new RolePolicyDto(role.policy);
      }
    }
  }
}
