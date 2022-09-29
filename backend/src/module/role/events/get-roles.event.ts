import { RoleType } from '@/core/typeorm/entities';
import { RoleRowDto } from '../dto';
import { RoleRepository } from '../role.repository';

const EXCLUDE_ROLE_TYPES = [RoleType.Master];

export const getRolesEvent = async (
  repository: RoleRepository,
): Promise<RoleRowDto[]> => {
  const roles = await repository.findRoles(EXCLUDE_ROLE_TYPES);
  const users = await repository.findUsersByRoleIds(roles.map(({ id }) => id));

  return roles.map((role) => {
    const roleUsers = users.filter((user) =>
      user.roles.map(({ id }) => id).includes(role.id),
    );

    return new RoleRowDto(role, roleUsers);
  });
};
