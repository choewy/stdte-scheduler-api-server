import { axiosInstance } from '@/utils/axios';
import { AuthenticateUserState } from '@/app/authenticate';
import { SignInRequestDto, SignUpRequestDto } from './request.dto';

export class AuthApi {
  async auth(): Promise<AuthenticateUserState> {
    try {
      const { data } = await axiosInstance({
        method: 'GET',
        url: '/auth',
      });
      return data;
    } catch (e) {
      throw e;
    }
  }

  async signin(
    body: SignInRequestDto,
  ): Promise<{ refreshToken: string; accessToken: string }> {
    try {
      const { data } = await axiosInstance({
        method: 'POST',
        url: '/auth/signin',
        data: body,
      });
      return data;
    } catch (e) {
      throw e;
    }
  }

  async signup(
    body: SignUpRequestDto,
  ): Promise<{ refreshToken: string; accessToken: string }> {
    try {
      const { data } = await axiosInstance({
        method: 'POST',
        url: '/auth/signup',
        data: body,
      });
      return data;
    } catch (e) {
      throw e;
    }
  }
}
