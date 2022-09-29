import { RoleType } from '@/core/typeorm/entities';
import { RoleParamDto, RoleRowDto } from '../dto';
import { RoleRepository } from '../role.repository';

const EXCLUDE_ROLE_TYPES = [RoleType.Master];

export const getRoleEvent = async (
  repository: RoleRepository,
  param: RoleParamDto,
): Promise<RoleRowDto> => {
  const role = await repository.findRole(param, EXCLUDE_ROLE_TYPES);
  const users = await repository.findUsersByRoleIds([role.id]);

  return new RoleRowDto(role, users);
};
