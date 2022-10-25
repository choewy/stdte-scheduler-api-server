import { Expose } from 'class-transformer';

export class AuthUserRvo {
  @Expose()
  uid: number;

  @Expose()
  name: string;

  @Expose()
  email: string;
}
