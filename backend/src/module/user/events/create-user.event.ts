import { localDateTime } from '@/core/datetime';
import { RoleType, User, UserStatus } from '@/core/typeorm/entities';
import { CreateUserDto, UserRowDto } from '../dto';
import { AlreadyUsedUsernameException } from '../user.exception';
import { UserRepository } from '../user.repository';

const EXCLUDE_ROLE_TYPES = [RoleType.Master, RoleType.Admin];

export const createUserEvent = async (
  repository: UserRepository,
  body: Partial<User> & CreateUserDto,
): Promise<UserRowDto> => {
  const { roleIds, teamIds, ...data } = body;
  const param = { username: body.username };
  const check = await repository.findUser(param, EXCLUDE_ROLE_TYPES);

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

  const newUser = await repository.saveUser(body);

  return new UserRowDto(newUser);
};
