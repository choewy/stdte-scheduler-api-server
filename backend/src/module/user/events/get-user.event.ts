import { RoleType } from '@/core/typeorm/entities';
import { UserParamDto, UserRowDto } from '../dto';
import { NotFoundUserException } from '../user.exception';
import { UserRepository } from '../user.repository';

const EXCLUDE_ROLE_TYPES = [RoleType.Master, RoleType.Admin];

export const getUserEvent = async (
  repository: UserRepository,
  param: UserParamDto,
) => {
  const user = await repository.findUser(param, EXCLUDE_ROLE_TYPES);

  if (!user) {
    throw NotFoundUserException;
  }

  return new UserRowDto(user);
};
