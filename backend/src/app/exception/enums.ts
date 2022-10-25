export enum AppError {
  InvalidToken = 'InvalidToken',
  ExpiredToken = 'ExpiredToken',
  Unauthorized = 'Unauthorized',
  InvalidGithubOAuth = 'InvalidGithubOAuth',
  InvalidKakaoOAuth = 'InvalidKakaoOAuth',
  UnexpectedGithubApi = 'UnexpectedGithubApi',
  UnexpectedKakaoApi = 'UnexpectedKakaoApi',
}
