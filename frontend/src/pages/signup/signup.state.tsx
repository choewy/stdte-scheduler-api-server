import { TextFieldProps } from '@mui/material';
import { atom } from 'recoil';

export class SignUpState {
  username: TextFieldProps = {
    key: 'input-signup-username',
    variant: 'standard',
    type: 'text',
    name: 'username',
    label: '아이디',
    value: '',
    error: false,
    helperText: '',
    onChange: undefined,
  };

  password: TextFieldProps = {
    key: 'input-signup-password',
    variant: 'standard',
    type: 'password',
    name: 'password',
    label: '비밀번호',
    value: '',
    error: false,
    helperText: '',
    onChange: undefined,
  };

  confirmPassword: TextFieldProps = {
    key: 'input-signup-confirm-password',
    variant: 'standard',
    type: 'password',
    name: 'confirmPassword',
    label: '비밀번호 확인',
    value: '',
    error: false,
    helperText: '',
    onChange: undefined,
  };

  nickname: TextFieldProps = {
    key: 'input-signup-nickname',
    variant: 'standard',
    type: 'text',
    name: 'nickname',
    label: '닉네임',
    value: '',
    error: false,
    helperText: '',
    onChange: undefined,
  };

  email: TextFieldProps = {
    key: 'input-signup-email',
    variant: 'standard',
    type: 'text',
    name: 'email',
    label: '이메일',
    value: '',
    error: false,
    helperText: '',
    onChange: undefined,
  };
}

export const signUpState = atom({
  key: 'signup',
  default: new SignUpState(),
});
