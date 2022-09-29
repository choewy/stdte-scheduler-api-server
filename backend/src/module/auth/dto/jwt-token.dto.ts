import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class JwtTokenDto {
  @ApiResponseProperty()
  @Expose()
  accessToken: string;

  @ApiResponseProperty()
  @Expose()
  refreshToken: string;

  constructor(tokens?: { accessToken: string; refreshToken: string }) {
    if (tokens?.accessToken) {
      this.accessToken = tokens.accessToken;
    }

    if (tokens?.refreshToken) {
      this.refreshToken = tokens.refreshToken;
    }
  }
}
