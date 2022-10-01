import { localDateTime } from '@/core/datetime';
import { RoleType, UserStatus } from '@/core/typeorm/entities';
import { UserRepository } from '../user.repository';
import { UpdateUserDto, UserParamDto, UserRowDto } from '../dto';
import {
  AlreadyUsedEmailException,
  NotFoundUserException,
} from '../user.exception';

const EXCLUDE_ROLE_TYPES = [RoleType.Master, RoleType.Admin];

export const updateUserEvent = async (
  repository: UserRepository,
  param: UserParamDto,
  { status, ...body }: UpdateUserDto,
): Promise<UserRowDto> => {
  const user = await repository.findUser(param, EXCLUDE_ROLE_TYPES);

  if (!user) {
    throw NotFoundUserException;
  }

  if (body.email) {
    const param = { id: user.id, email: body.email };
    const check = repository.findUserByNotIdAndEmail(param);

    if (check) {
      throw AlreadyUsedEmailException;
    }
  }

  if (status) {
    const disable = UserStatus.Disable;
    user.status = status;
    user.disabledAt = status === disable ? localDateTime() : null;
  }

  const newUser = await repository.saveUser(Object.assign(user, body));

  return new UserRowDto(newUser);
};
