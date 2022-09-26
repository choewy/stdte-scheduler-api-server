import { atom } from 'recoil';

export class SignUpState {
  username: string = '';
  password: string = '';
  confirmPassword: string = '';
  nickname: string = '';
  email?: string = undefined;
}

export const signUpState = atom({
  key: 'signup',
  default: new SignUpState(),
});
