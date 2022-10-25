import { Expose } from 'class-transformer';

export class AuthTokenRvo {
  @Expose()
  accessToken: string;

  @Expose()
  refreshToken: string;
}
