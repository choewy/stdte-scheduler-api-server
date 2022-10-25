import { AppErrorMapType } from './types';

export const AppErrorMap: AppErrorMapType = {
  InvalidToken: (details) => ({
    status: 401,
    message: 'invalid_token',
    error: 'Unauthorized',
    details,
  }),
  ExpiredToken: (details) => ({
    status: 401,
    message: 'expired_token',
    error: 'Unauthorized',
    details,
  }),
  Unauthorized: (details) => ({
    status: 401,
    message: 'fail_authorized',
    error: 'Unauthorized',
    details,
  }),
  InvalidGithubOAuth: (details) => ({
    status: 401,
    message: 'invalid_github_oauth',
    error: 'Unauthorized',
    details,
  }),
  UnexpectedGithubApi: (details) => ({
    status: 500,
    message: 'unexprected_github_api_error',
    error: 'InternalServerError',
    details,
  }),
  InvalidKakaoOAuth: (details) => ({
    status: 401,
    message: 'invalid_kakao_oauth',
    error: 'Unauthorized',
    details,
  }),
  UnexpectedKakaoApi: (details) => ({
    status: 500,
    message: 'unexprected_kakao_api_error',
    error: 'KakaoApiError',
    details,
  }),
};
