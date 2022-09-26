import { AppUserState } from '@/app';
import { AxiosInstance, ApiResult } from '@/utils/axios';
import { SignInRequestDto, SignUpRequestDto } from './request.dto';

export class AuthApi extends AxiosInstance {
  auth(): ApiResult<AppUserState> {
    return this.axios({
      method: 'GET',
      url: '/auth',
    });
  }

  async signin(body: SignInRequestDto): Promise<void> {
    try {
      const { data } = await this.axios({
        method: 'POST',
        url: '/auth/signin',
        data: body,
      });
      this.saveTokens(data);
    } catch (e) {
      throw e;
    }
  }

  async signup(body: SignUpRequestDto): Promise<void> {
    try {
      const { data } = await this.axios({
        method: 'POST',
        url: '/auth/signup',
        data: body,
      });
      this.saveTokens(data);
    } catch (e) {
      throw e;
    }
  }
}
