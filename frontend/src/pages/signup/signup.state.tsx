import { InputAttributeProps } from '@/components';
import { atom } from 'recoil';

export class SignUpState {
  username: InputAttributeProps = {
    key: 'input-signup-username',
    type: 'text',
    name: 'username',
    placeholder: '아이디',
    value: '',
    onChange: undefined,
  };

  password: InputAttributeProps = {
    key: 'input-signup-password',
    type: 'password',
    name: 'password',
    placeholder: '비밀번호',
    value: '',
    onChange: undefined,
  };

  confirmPassword: InputAttributeProps = {
    key: 'input-signup-confirm-password',
    type: 'password',
    name: 'confirmPassword',
    placeholder: '비밀번호 확인',
    value: '',
    onChange: undefined,
  };

  nickname: InputAttributeProps = {
    key: 'input-signup-nickname',
    type: 'text',
    name: 'nickname',
    placeholder: '닉네임',
    value: '',
    onChange: undefined,
  };

  email: InputAttributeProps = {
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
