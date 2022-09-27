import { AxiosRequestHeaders } from 'axios';
import { AxiosRequestConfig } from 'axios';

export type ApiRequestHeaders = AxiosRequestHeaders & {
  common: { Authorization: string };
};

export type ApiRequestConfig = {
  [key: string]: (...args: any[]) => AxiosRequestConfig;
};
