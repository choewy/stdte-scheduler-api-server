import { UserStatus, UserType } from '@/core/typeorm/entities';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class SignResponse {
  @ApiResponseProperty()
  @Expose()
  accessToken: string;

  @ApiResponseProperty()
  @Expose()
  refreshToken: string;
}

export class AuthResponse {
  @ApiResponseProperty()
  @Expose()
  id: number;

  @ApiResponseProperty()
  @Expose()
  type: UserType;

  @ApiResponseProperty()
  @Expose()
  name: string;

  @ApiResponseProperty()
  @Expose()
  email: string;

  @ApiResponseProperty()
  @Expose()
  status: UserStatus;
}
