import { AxiosRequestHeaders } from 'axios';

export type AuthorizationTokens = {
  accessToken: string;
  refreshToken: string;
};

export type ApiRequestHeaders = AxiosRequestHeaders & {
  common: {
    Authorization: string;
  };
};
