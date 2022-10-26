import { Expose } from 'class-transformer';
import { AuthRoleRvo } from './auth-role.rvo';

export class AuthUserRvo {
  @Expose()
  uid: number;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: AuthRoleRvo;
}
