import { FC, ChangeEvent, useState, useCallback, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { InputAdornment } from '@mui/material';
import { Mail as MailIcon, Lock as PasswordIcon } from '@mui/icons-material';
import { TitleElement } from '@/core';
import { SignEvent } from './enums';
import { initSignInAccountState } from './states';
import { useSignCallback, useSignConnection } from './hooks';
import {
  SignButtonElement,
  SignFormElement,
  SignInputElement,
} from './elements';

export const SignInPage: FC = () => {
  const navigate = useNavigate();
  const connection = useSignConnection();
  const [account, setAccount] = useState(initSignInAccountState);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setAccount({
        ...account,
        [name]: value,
      });
    },
    [account, setAccount],
  );

  const onSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      connection.emit(
        SignEvent.SignInEmail,
        account,
        useSignCallback(connection, navigate),
      );
    },
    [connection, account, navigate],
  );

  return (
    <SignFormElement onSubmit={onSubmit}>
      <TitleElement title="로그인" />
      <SignInputElement
        type="text"
        name="email"
        label="이메일"
        placeholder="이메일 계정을 입력하세요."
        value={account.email}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <MailIcon />
            </InputAdornment>
          ),
        }}
      />
      <SignInputElement
        type="password"
        name="password"
        label="비밀번호"
        placeholder="비밀번호를 입력하세요."
        value={account.password}
        onChange={onChange}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <PasswordIcon />
            </InputAdornment>
          ),
        }}
      />
      <SignButtonElement text="로그인" />
    </SignFormElement>
  );
};
