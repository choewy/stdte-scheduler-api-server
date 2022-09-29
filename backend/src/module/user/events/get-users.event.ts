import { RoleType } from '@/core/typeorm/entities';
import { UserRowDto } from '../dto';
import { UserRepository } from '../user.repository';

const EXCLUDE_ROLE_TYPES = [RoleType.Master, RoleType.Admin];

export const getUsersEvent = async (
  repository: UserRepository,
): Promise<UserRowDto[]> => {
  const users = await repository.findUsers(EXCLUDE_ROLE_TYPES);
  return users.map((user) => new UserRowDto(user));
};
