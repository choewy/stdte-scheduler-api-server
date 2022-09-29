import { RoleType } from '@/core/typeorm/entities';
import { UserParamDto } from '../dto';
import { NotFoundUserException } from '../user.exception';
import { UserRepository } from '../user.repository';

const EXCLUDE_ROLE_TYPES = [RoleType.Master, RoleType.Admin, RoleType.Default];

export const deleteUserEvent = async (
  repository: UserRepository,
  param: UserParamDto,
): Promise<void> => {
  const user = await repository.findUser(param, EXCLUDE_ROLE_TYPES);

  if (!user) {
    throw NotFoundUserException;
  }

  return await repository.deleteUser(param);
};
