import {
  PolicyStatus,
  RolePolicy,
  RolePolicyInterface,
} from '@/core/typeorm/entities';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class RolePolicyDto implements RolePolicyInterface {
  @ApiResponseProperty({ type: 'string' })
  @Expose()
  read: PolicyStatus;

  @ApiResponseProperty({ type: 'string' })
  @Expose()
  write: PolicyStatus;

  @ApiResponseProperty({ type: 'string' })
  @Expose()
  update: PolicyStatus;

  @ApiResponseProperty({ type: 'string' })
  @Expose()
  delete: PolicyStatus;

  constructor(rolePolicy?: RolePolicy) {
    if (rolePolicy) {
      this.read = rolePolicy.read;
      this.write = rolePolicy.write;
      this.update = rolePolicy.update;
      this.delete = rolePolicy.delete;
    }
  }
}
