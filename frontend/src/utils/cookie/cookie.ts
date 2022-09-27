import Cookies from 'universal-cookie';
import { AUTH_CONFIG } from '@/configs';
import { AuthorizationTokens } from './interfaces';

export const getBearerAuth = () => {
  const cookies = new Cookies();
  const accessToken = cookies.get(AUTH_CONFIG.access);
  return accessToken ? `Bearer ${accessToken}` : '';
};

export const saveTokens = ({
  accessToken,
  refreshToken,
}: AuthorizationTokens) => {
  const cookies = new Cookies();
  cookies.set(AUTH_CONFIG.access, accessToken);
  cookies.set(AUTH_CONFIG.refresh, refreshToken);
};

export const removeTokens = () => {
  const cookies = new Cookies();
  cookies.remove(AUTH_CONFIG.access);
  cookies.remove(AUTH_CONFIG.refresh);
};
