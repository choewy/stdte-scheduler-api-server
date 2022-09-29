import { RoleType } from '@/core/typeorm/entities';
import { UserParamDto } from '../dto';
import { NotFoundUserException } from '../user.exception';
import { UserRepository } from '../user.repository';

export const deleteUserEvent = async (
  repository: UserRepository,
  types: RoleType[],
  param: UserParamDto,
): Promise<void> => {
  const user = await repository.findUser(param, types);

  if (!user) {
    throw NotFoundUserException;
  }

  return await repository.deleteUser(param);
};
