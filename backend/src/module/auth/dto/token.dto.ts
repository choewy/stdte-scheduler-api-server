import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TokenDto {
  @ApiResponseProperty()
  @Expose()
  accessToken: string;

  @ApiResponseProperty()
  @Expose()
  refreshToken: string;

  constructor(tokens?: { access: string; refresh: string }) {
    const { access, refresh } = tokens;

    if (access && refresh) {
      this.accessToken = access;
      this.refreshToken = refresh;
    }
  }
}
