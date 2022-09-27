import axios from 'axios';
import { API_CONFIG } from '@/configs';
import {
  requestInterceptorCallback,
  requestInterceptorError,
  responseInterceptorCallback,
  responseInterceptorError,
} from './axios.interceptor';

export const axiosInstance = axios.create({
  baseURL: API_CONFIG.baseURL,
  headers: API_CONFIG.headers,
  withCredentials: API_CONFIG.credentials,
});

axiosInstance.interceptors.request.use(
  requestInterceptorCallback,
  requestInterceptorError,
);

axiosInstance.interceptors.response.use(
  responseInterceptorCallback,
  responseInterceptorError,
);
