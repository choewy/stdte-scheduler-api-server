import { registerAs } from '@nestjs/config';
import { KakaoConfig } from './interfaces';
import { ConfigKey } from './enums';

export default registerAs(
  ConfigKey.Kakao,
  (): KakaoConfig => ({
    clientKey: process.env.KAKAO_API_CLIENT_KEY,
    adminKey: process.env.KAKAO_API_ADMIN_KEY,
    redirectUri: process.env.KAKAO_API_REDIRECT_URI,
  }),
);
