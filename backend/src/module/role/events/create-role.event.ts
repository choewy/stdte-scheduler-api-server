import { PolicyRange, Role, RolePolicy } from '@/core/typeorm/entities';
import { AlreadyUsedRoleNameException } from '../role.exception';
import { RoleRepository } from '../role.repository';
import { CreateRoleDto } from '../dto';

export const createRoleEvent = async (
  repository: RoleRepository,
  body: CreateRoleDto,
): Promise<void> => {
  const param = { name: body.name };
  const check = await repository.findRole(param);

  if (check) {
    throw AlreadyUsedRoleNameException;
  }

  let role = new Role();
  role.name = body.name;
  role.visible = body.visible;

  role = await repository.saveRole(role);
  role.policy = new RolePolicy();
  role.policy.roleId = role.id;
  role.policy.read = PolicyRange.Team;
  role.policy.write = PolicyRange.Only;
  role.policy.update = PolicyRange.Only;
  role.policy.delete = PolicyRange.None;

  await repository.saveRole(role);
};
