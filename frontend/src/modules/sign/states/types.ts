export type SignUpAccountType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
};

export type SignInAccountType = {
  email: string;
  password: string;
};

export type TokenType = {
  accessToken: string;
  refreshToken: string;
};
