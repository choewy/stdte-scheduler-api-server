import { localDateTime } from '@/core/datetime';
import { RoleType, User, UserStatus } from '@/core/typeorm/entities';
import { CreateUserDto } from '../dto';
import { AlreadyUsedUsernameException } from '../user.exception';
import { UserRepository } from '../user.repository';

export const createUserEvent = async (
  repository: UserRepository,
  types: RoleType[],
  body: Partial<User> & CreateUserDto,
): Promise<void> => {
  const { roleIds, teamIds, ...data } = body;
  const param = { username: body.username };
  const check = await repository.findUser(param, types);

  if (check) {
    throw AlreadyUsedUsernameException;
  }

  const user = new User();
  user.username = data.username;
  user.password = data.password;
  user.nickname = data.nickname;
  user.email = data.email;
  user.status = UserStatus.Wait;
  user.disabledAt = localDateTime();

  if (roleIds) {
    user.roles = await repository.findRolesByIds(roleIds);
  }

  if (teamIds) {
    user.teams = await repository.findTeamsByIds(teamIds);
  }

  return await repository.saveOne(body);
};
