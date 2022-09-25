import { AxiosInstance, ApiResult } from '@/utils/axios';
import { SignInRequestDto, SignUpRequestDto } from './request.dto';
import { AuthReponseDto, SignResponseDto } from './response.dto';

export class AuthApi extends AxiosInstance {
  auth(): ApiResult<AuthReponseDto> {
    return this.axios({
      method: 'GET',
      url: '/auth',
    });
  }

  signin(body: SignInRequestDto): ApiResult<SignResponseDto> {
    return this.axios({
      method: 'POST',
      url: '/auth/signin',
      data: body,
    });
  }

  signup(body: SignUpRequestDto): ApiResult<SignResponseDto> {
    return this.axios({
      method: 'POST',
      url: '/auth/signup',
      data: body,
    });
  }
}
