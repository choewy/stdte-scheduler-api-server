import { AxiosRequestHeaders, AxiosResponse } from 'axios';
import { AxiosRequestConfig } from 'axios';

export type AuthorizationTokens = {
  accessToken: string;
  refreshToken: string;
};

export type ApiRequestHeaders = AxiosRequestHeaders & {
  common: {
    Authorization: string;
  };
};

export type ApiRequestConfig = {
  [key: string]: (...args: any[]) => AxiosRequestConfig;
};

export type ApiResult<T = any, D = any> = Promise<AxiosResponse<T, D>>;
