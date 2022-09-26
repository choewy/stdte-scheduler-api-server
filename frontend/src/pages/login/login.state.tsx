import { atom } from 'recoil';

export class LoginState {
  username: string = '';
  password: string = '';
}

export const loginState = atom<LoginState>({
  key: 'login',
  default: new LoginState(),
});
