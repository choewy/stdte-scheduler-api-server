import { localDateTime } from '@/core/datetime';
import { RoleType, UserStatus } from '@/core/typeorm/entities';
import { UserRepository } from '../user.repository';
import { UpdateUserDto, UserParamDto } from '../dto';
import {
  AlreadyUsedEmailException,
  NotFoundUserException,
} from '../user.exception';

export const updateUserEvent = async (
  repository: UserRepository,
  types: RoleType[],
  param: UserParamDto,
  { status, ...body }: UpdateUserDto,
): Promise<void> => {
  const user = await repository.findUser(param, types);

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

  return await repository.saveUser(Object.assign(user, body));
};
