import { API_CONFIG, AUTH_CONFIG, ROUTER } from '@/configs';
import { AuthorizationTokens } from './types';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import Cookie from 'universal-cookie';
import { useNavigate } from 'react-router-dom';

export class AxiosInstance {
  protected readonly cookie = new Cookie();
  protected readonly axios = axios.create({
    baseURL: API_CONFIG.baseURL,
    headers: API_CONFIG.headers,
    withCredentials: API_CONFIG.credentials,
  });

  protected saveTokens({ accessToken, refreshToken }: AuthorizationTokens) {
    this.cookie.set(AUTH_CONFIG.access, accessToken);
    this.cookie.set(AUTH_CONFIG.refresh, refreshToken);
  }

  protected removeTokens() {
    this.cookie.remove(AUTH_CONFIG.access);
    this.cookie.remove(AUTH_CONFIG.refresh);
    return useNavigate()(ROUTER.signin);
  }

  private get bearerAuth() {
    const accessToken = this.cookie.get(AUTH_CONFIG.access);
    return accessToken ? `Bearer ${accessToken}` : '';
  }

  private async refreshAuth() {
    try {
      const response = await this.axios({
        method: 'GET',
        url: '/auth/token',
        data: {
          accessToken: this.cookie.get(AUTH_CONFIG.access),
          refreshToken: this.cookie.get(AUTH_CONFIG.refresh),
        },
      });
      const tokens = response.data as AuthorizationTokens;
      this.saveTokens(tokens);
    } catch (e) {
      this.removeTokens();
    }
  }

  private useRequestInterceptor(): void {
    this.axios.interceptors.request.use(
      (config): AxiosRequestConfig => {
        const Authorization = this.bearerAuth;
        return Object.assign(config, {
          headers: { Authorization },
        });
      },
      async (e): Promise<void> => {
        return Promise.reject(e);
      },
    );
  }

  private useResponseInterceptor(): void {
    this.axios.interceptors.response.use(
      (config): AxiosRequestConfig => config,
      async (e: AxiosError): Promise<void> => {
        switch (e.response?.status) {
          case 401:
            return this.removeTokens();
          case 403:
            return this.refreshAuth();
          default:
            return Promise.reject(e);
        }
      },
    );
  }

  constructor() {
    this.useRequestInterceptor();
    this.useResponseInterceptor();
  }
}
