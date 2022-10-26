import { FC, ChangeEvent, useState, useCallback, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { TitleElement } from '@/core';
import { SignEvent } from './enums';
import { useSignCallback, useSignConnection } from './hooks';
import { initSignUpAccountState } from './states';
import {
  SignButtonElement,
  SignFormElement,
  SignInputElement,
} from './elements';

export const SignUpPage: FC = () => {
  const navigate = useNavigate();
  const connection = useSignConnection();
  const [account, setAccount] = useState(initSignUpAccountState);

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
        SignEvent.SignUp,
        account,
        useSignCallback(connection, navigate),
      );
    },
    [connection, account, navigate],
  );

  return (
    <SignFormElement onSubmit={onSubmit}>
      <TitleElement title="회원가입" />
      <SignInputElement
        type="text"
        name="name"
        label="이름"
        placeholder="이름을 입력하세요."
        value={account.name}
        onChange={onChange}
      />
      <SignInputElement
        type="text"
        name="email"
        label="이메일"
        placeholder="이메일을 입력하세요."
        value={account.email}
        onChange={onChange}
      />
      <SignInputElement
        type="password"
        name="password"
        label="비밀번호"
        placeholder="비밀번호를 입력하세요."
        value={account.password}
        onChange={onChange}
      />
      <SignInputElement
        type="confirmPassword"
        name="password"
        label="비밀번호 확인"
        placeholder="비밀번호를 입력하세요."
        value={account.confirmPassword}
        onChange={onChange}
      />
      <SignButtonElement text="회원가입" />
    </SignFormElement>
  );
};
