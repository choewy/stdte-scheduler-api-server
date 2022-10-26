import { SignInAccountType, SignUpAccountType } from './types';

export const initSignUpAccountState: SignUpAccountType = {
  name: '',
  email: '',
  password: '',
  confirmPassword: '',
};

export const initSignInAccountState: SignInAccountType = {
  email: '',
  password: '',
};
