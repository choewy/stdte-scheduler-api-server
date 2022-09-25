export interface SignInRequestDto {
  username: string;
  password: string;
}

export interface SignUpRequestDto {
  username: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  email?: string;
}
