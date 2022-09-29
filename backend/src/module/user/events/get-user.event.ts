import { RoleType } from '@/core/typeorm/entities';
import { UserParamDto, UserRowDto } from '../dto';
import { NotFoundUserException } from '../user.exception';
import { UserRepository } from '../user.repository';

export const getUserEvent = async (
  repository: UserRepository,
  types: RoleType[],
  param: UserParamDto,
) => {
  const user = await repository.findUser(param, types);

  if (!user) {
    throw NotFoundUserException;
  }

  return new UserRowDto(user);
};
