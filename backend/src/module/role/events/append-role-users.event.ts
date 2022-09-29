import { RoleType } from '@/core/typeorm/entities';
import { RoleParamDto, UpdateRoleMemberDto } from '../dto';
import { NotFoundRoleException } from '../role.exception';
import { RoleRepository } from '../role.repository';

const EXCLUDE_ROLE_TYPES = [RoleType.Master, RoleType.Admin, RoleType.Default];

export const appendRoleUsersEvent = async (
  repository: RoleRepository,
  param: RoleParamDto,
  body: UpdateRoleMemberDto,
): Promise<void> => {
  const role = await repository.findRole(param, EXCLUDE_ROLE_TYPES);

  if (!role) {
    throw NotFoundRoleException;
  }

  const users = await repository.findUsersByUserIds(body.userIds);

  users.forEach((user) => {
    user.roles = user.roles
      .filter((role) => role.type !== RoleType.Default)
      .concat(role);
  });

  await repository.saveUsers(users);
};
