import { verifyPassword } from '@/core/bcrypt';
import { JwtAuthService, JwtType } from '@/core/jwt-auth';
import { IncorrectAccountOrPasswordException } from '../auth.exception';
import { AuthRepository } from '../auth.repository';
import { SignInDto, JwtTokenDto } from '../dto';

export const signInEvent = async (
  repository: AuthRepository,
  jwtAuthService: JwtAuthService,
  body: SignInDto,
): Promise<JwtTokenDto> => {
  const params = { username: body.username };
  const user = await repository.findUser(params);

  if (!user) {
    throw IncorrectAccountOrPasswordException;
  }

  const verify = verifyPassword(body.password, user.password);

  if (!verify) {
    throw IncorrectAccountOrPasswordException;
  }

  const payload = { id: user.id };

  const accessToken = jwtAuthService.sign(JwtType.AccesToken, payload);
  const refreshToken = jwtAuthService.sign(JwtType.RefreshToken, payload);

  return new JwtTokenDto({ accessToken, refreshToken });
};
