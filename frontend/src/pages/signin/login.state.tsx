import { atom } from 'recoil';

export class SignInState {
  username: string = '';
  password: string = '';
}

export const signInState = atom<SignInState>({
  key: 'signin',
  default: new SignInState(),
});
