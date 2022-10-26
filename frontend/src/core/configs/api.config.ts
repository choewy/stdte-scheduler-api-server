import { ApiConfig } from './types';

export const apiConfig = (): ApiConfig => ({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: process.env.REACT_APP_CREDENTIALS === 'true',
});
