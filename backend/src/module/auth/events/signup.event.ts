import { verifyPassword } from '@/core/bcrypt';
import { localDateTime } from '@/core/datetime';
import { JwtAuthService, JwtType } from '@/core/jwt-auth';
import {
  RoleType,
  TeamStatus,
  User,
  UserStatus,
} from '@/core/typeorm/entities';
import {
  AlreadyUsedUsernameOrEmailException,
  IncorrectConfirmPasswordException,
} from '../auth.exception';
import { AuthRepository } from '../auth.repository';
import { SignUpDto, JwtTokenDto } from '../dto';

export const signUpEvent = async (
  repository: AuthRepository,
  jwtAuthService: JwtAuthService,
  { password, confirmPassword, username, nickname, email }: SignUpDto,
): Promise<JwtTokenDto> => {
  const verify = verifyPassword(confirmPassword, password);

  if (!verify) {
    throw IncorrectConfirmPasswordException;
  }

  const params = { username };

  if (email) {
    params['email'] = email;
  }

  const check = await repository.findUser(params);

  if (check) {
    throw AlreadyUsedUsernameOrEmailException;
  }

  const roles = await repository.findRoles([RoleType.Default]);
  const teams = await repository.findTeams([TeamStatus.Default]);

  let user = new User();
  user.username = username;
  user.nickname = nickname;
  user.password = password;
  user.email = email;
  user.roles = roles;
  user.teams = teams;
  user.status = UserStatus.Wait;
  user.disabledAt = localDateTime();

  user = await repository.saveUser(user);

  const payload = { id: user.id };

  const accessToken = jwtAuthService.sign(JwtType.AccesToken, payload);
  const refreshToken = jwtAuthService.sign(JwtType.RefreshToken, payload);

  return new JwtTokenDto({ accessToken, refreshToken });
};
