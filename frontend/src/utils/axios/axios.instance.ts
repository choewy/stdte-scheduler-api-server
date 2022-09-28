import axios, { AxiosRequestConfig } from 'axios';
import { API_CONFIG } from '@/configs';
import {
  requestInterceptorCallback,
  requestInterceptorError,
  responseInterceptorCallback,
  responseInterceptorError,
} from './axios.interceptor';

export const axiosInstance = (config: AxiosRequestConfig) => {
  const instance = axios.create({
    baseURL: API_CONFIG.baseURL,
    headers: API_CONFIG.headers,
    withCredentials: API_CONFIG.credentials,
  });

  instance.interceptors.request.use(
    requestInterceptorCallback,
    requestInterceptorError,
  );

  instance.interceptors.response.use(
    responseInterceptorCallback,
    responseInterceptorError,
  );

  return instance(config);
};
