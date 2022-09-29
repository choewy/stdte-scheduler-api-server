import { RoleType } from '@/core/typeorm/entities';
import { RoleRepository } from '../role.repository';
import { RoleParamDto, UpdateRoleDto } from '../dto';
import {
  AlreadyUsedRoleNameException,
  NotFoundRoleException,
} from '../role.exception';

const EXCLUDE_ROLE_TYEPS = [RoleType.Master, RoleType.Admin, RoleType.Default];

export const updateRoleEvent = async (
  repository: RoleRepository,
  param: RoleParamDto,
  body: UpdateRoleDto,
) => {
  const role = await repository.findRole(param, EXCLUDE_ROLE_TYEPS);

  if (!role) {
    throw NotFoundRoleException;
  }

  role.visible = body.visible;

  if (body.name) {
    const param = { name: body.name };
    const check = await repository.findRole(param);

    if (check) {
      throw AlreadyUsedRoleNameException;
    }

    role.name = body.name;
  }

  await repository.saveRole(role);
};
