import { InputProps } from '@/components/elements';
import { atom } from 'recoil';

export class SignInState {
  username: InputProps = {
    key: 'signin-input-username',
    type: 'text',
    name: 'username',
    placeholder: '아이디',
    value: '',
    onChange: undefined,
  };

  password: InputProps = {
    key: 'signin-input-password',
    type: 'password',
    name: 'password',
    placeholder: '비밀번호',
    value: '',
    onChange: undefined,
  };
}

export const signInState = atom<SignInState>({
  key: 'signin',
  default: new SignInState(),
});
