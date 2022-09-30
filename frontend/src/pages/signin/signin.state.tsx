import { TextFieldProps } from '@mui/material';
import { atom } from 'recoil';

export class SignInState {
  username: TextFieldProps = {
    key: 'signin-input-username',
    variant: 'standard',
    type: 'text',
    name: 'username',
    label: '아이디',
    autoComplete: 'off',
    value: '',
    error: false,
    helperText: '',
    onChange: undefined,
  };

  password: TextFieldProps = {
    key: 'signin-input-password',
    variant: 'standard',
    type: 'password',
    name: 'password',
    label: '비밀번호',
    autoComplete: 'off',
    value: '',
    error: false,
    helperText: '',
    onChange: undefined,
  };
}

export const signInState = atom<SignInState>({
  key: 'signin',
  default: new SignInState(),
});
