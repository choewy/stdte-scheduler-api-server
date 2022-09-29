import { RoleType } from '@/core/typeorm/entities';
import { UserRowDto } from '../dto';
import { UserRepository } from '../user.repository';

export const getUsersEvent = async (
  repository: UserRepository,
  types?: RoleType[],
): Promise<UserRowDto[]> => {
  const users = await repository.findUsers(types);
  return users.map((user) => new UserRowDto(user));
};
