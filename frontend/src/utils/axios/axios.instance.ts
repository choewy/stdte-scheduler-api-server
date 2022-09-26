import { API_CONFIG, AUTH_CONFIG, ROUTER } from '@/configs';
import { AuthorizationTokens } from './types';
import { ReactLocation } from 'react-location';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import Cookies from 'universal-cookie';

export class AxiosInstance {
  protected get axios() {
    return axios.create({
      baseURL: API_CONFIG.baseURL,
      headers: API_CONFIG.headers,
      withCredentials: API_CONFIG.credentials,
    });
  }

  protected get location() {
    return new ReactLocation();
  }

  protected get cookies() {
    return new Cookies();
  }

  protected saveTokens({ accessToken, refreshToken }: AuthorizationTokens) {
    this.cookies.set(AUTH_CONFIG.access, accessToken);
    this.cookies.set(AUTH_CONFIG.refresh, refreshToken);
  }

  protected removeTokens() {
    this.cookies.remove(AUTH_CONFIG.access);
    this.cookies.remove(AUTH_CONFIG.refresh);
    this.location.history.replace(ROUTER.signin);
  }

  private get bearerAuth() {
    const accessToken = this.cookies.get(AUTH_CONFIG.access);
    return accessToken ? `Bearer ${accessToken}` : '';
  }

  private async refreshAuth() {
    try {
      const response = await this.axios({
        method: 'GET',
        url: '/auth/token',
        data: {
          accessToken: this.cookies.get(AUTH_CONFIG.access),
          refreshToken: this.cookies.get(AUTH_CONFIG.refresh),
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
        return Object.assign(config, { headers: { Authorization } });
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
