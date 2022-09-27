import { InputAttributeProps } from '@/components/elements';
import { atom } from 'recoil';

export class SignInState {
  username: InputAttributeProps = {
    key: 'signin-input-username',
    type: 'text',
    name: 'username',
    placeholder: '아이디',
    autoComplete: 'off',
    value: '',
    onChange: undefined,
  };

  password: InputAttributeProps = {
    key: 'signin-input-password',
    type: 'password',
    name: 'password',
    placeholder: '비밀번호',
    autoComplete: 'off',
    value: '',
    onChange: undefined,
  };
}

export const signInState = atom<SignInState>({
  key: 'signin',
  default: new SignInState(),
});
