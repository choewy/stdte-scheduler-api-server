import { Expose } from 'class-transformer';
import { AuthTokenRvo } from './auth-token.rvo';
import { AuthUserRvo } from './auth-user.rvo';

export class AuthRvo {
  @Expose()
  user: AuthUserRvo;

  @Expose()
  tokens: AuthTokenRvo;
}
