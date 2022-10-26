import { RolePolicies } from '@/typeorm';
import { SetMetadata } from '@nestjs/common';

export type RolePolicyMetadataType = Partial<
  RolePolicies & { is_admin: boolean }
>;

export const RolePolicyMetadataKey = 'role-policy';

export const RolePolicyMetadata = (policy: RolePolicyMetadataType) =>
  SetMetadata(RolePolicyMetadataKey, policy);
