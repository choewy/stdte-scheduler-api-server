import { InputProps } from '@/components/elements';
import { atom } from 'recoil';

export class SignUpState {
  username: InputProps = {
    key: 'input-signup-username',
    type: 'text',
    name: 'username',
    placeholder: '아이디',
    value: '',
    onChange: undefined,
  };

  password: InputProps = {
    key: 'input-signup-password',
    type: 'password',
    name: 'password',
    placeholder: '비밀번호',
    value: '',
    onChange: undefined,
  };

  confirmPassword: InputProps = {
    key: 'input-signup-confirm-password',
    type: 'password',
    name: 'confirmPassword',
    placeholder: '비밀번호 확인',
    value: '',
    onChange: undefined,
  };

  nickname: InputProps & InputProps = {
    key: 'input-signup-nickname',
    type: 'text',
    name: 'nickname',
    placeholder: '닉네임',
    value: '',
    onChange: undefined,
  };

  email: InputProps & InputProps = {
    key: 'input-signup-email',
    type: 'text',
    name: 'email',
    placeholder: '이메일',
    value: '',
    onChange: undefined,
  };
}

export const signUpState = atom({
  key: 'signup',
  default: new SignUpState(),
});
