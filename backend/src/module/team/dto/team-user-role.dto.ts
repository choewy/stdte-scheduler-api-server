import { RolePolicyDto } from '@/appllication/dto';
import { Role } from '@/core/typeorm/entities';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TeamUserRoleDto {
  @ApiResponseProperty()
  @Expose()
  id: number;

  @ApiResponseProperty()
  @Expose()
  name: string;

  @ApiResponseProperty({ type: RolePolicyDto })
  @Expose()
  policy: RolePolicyDto;

  constructor(role?: Partial<Role>) {
    if (role) {
      this.id = role.id;
      this.name = role.name;

      if (role.rolePolicy) {
        this.policy = new RolePolicyDto(role.rolePolicy);
      }
    }
  }
}
