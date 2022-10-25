import { Expose } from 'class-transformer';

export class AuthRvo {
  @Expose()
  uid: number;

  @Expose()
  name: string;

  @Expose()
  email: string;
}
