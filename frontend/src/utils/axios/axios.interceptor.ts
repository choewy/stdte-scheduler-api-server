import { PASS_ROUTERS } from '@/configs';
import { AxiosError, AxiosRequestConfig } from 'axios';
import { useLocation } from 'react-router-dom';
import { getBearerAuth, removeTokens } from '../cookie';

export const requestInterceptorCallback = (
  config: AxiosRequestConfig,
): AxiosRequestConfig => {
  return Object.assign(config, {
    headers: { Authorization: getBearerAuth() },
  });
};

export const requestInterceptorError = async (e: unknown) => {
  return Promise.reject(e);
};

export const responseInterceptorCallback = (
  config: AxiosRequestConfig,
): AxiosRequestConfig => {
  return config;
};

export const responseInterceptorError = async (
  e: AxiosError,
): Promise<void> => {
  const { pathname } = useLocation();
  if (!PASS_ROUTERS.includes(pathname)) {
    switch (e.response?.status) {
      case 401:
        return removeTokens();
      default:
        return Promise.reject(e);
    }
  }
};
