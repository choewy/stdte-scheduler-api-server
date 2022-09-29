import { RoleRepository } from '../role.repository';
import { RoleParamDto } from '../dto';
import { RoleType } from '@/core/typeorm/entities';
import {
  CanNotAccessRoleException,
  NotFoundRoleException,
} from '../role.exception';

const EXCLUDE_ROLE_TYPES = [RoleType.Master, RoleType.Admin, RoleType.Default];

export const deleteRoleEvent = async (
  repository: RoleRepository,
  param: RoleParamDto,
): Promise<void> => {
  const role = await repository.findRole(param);

  if (!role) {
    throw NotFoundRoleException;
  }

  if (EXCLUDE_ROLE_TYPES.includes(role.type)) {
    throw CanNotAccessRoleException;
  }

  await repository.deleteRole(param);
};
