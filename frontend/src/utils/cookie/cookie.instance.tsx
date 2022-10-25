import Cookies, { CookieSetOptions } from 'universal-cookie';

const cookie = new Cookies();
const options: CookieSetOptions = { path: '/' };

export class CookieInstance {
  private readonly ACCESS_TOKEN_KEY = 'accessToken';
  private readonly REFRESH_TOKEN_KEY = 'refreshToken';

  get cookie() {
    return cookie;
  }

  getBearerAuth() {
    return `Bearer ${this.getAccessToken() || ''}`;
  }

  getAccessToken(): string {
    return this.cookie.get(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string {
    return this.cookie.get(this.REFRESH_TOKEN_KEY);
  }

  setTokens({
    accessToken,
    refreshToken,
  }: {
    accessToken: string;
    refreshToken: string;
  }): void {
    this.cookie.set(this.ACCESS_TOKEN_KEY, accessToken, options);
    this.cookie.set(this.REFRESH_TOKEN_KEY, refreshToken, options);
  }

  setAccessToken(token: string): void {
    this.cookie.set(this.ACCESS_TOKEN_KEY, token, options);
  }

  setRefreshToken(token: string): void {
    this.cookie.set(this.REFRESH_TOKEN_KEY, token, options);
  }

  removeTokens(): void {
    this.cookie.remove(this.ACCESS_TOKEN_KEY, options);
    this.cookie.remove(this.REFRESH_TOKEN_KEY, options);
  }
}
