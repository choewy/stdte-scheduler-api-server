import { FC, ChangeEvent, useState, useCallback, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignEvent } from './enums';
import { useSignCallback, useSignConnection } from './hooks';
import { initSignUpAccountState } from './states';

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
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();

      await connection.emit(
        SignEvent.SignUp,
        account,
        useSignCallback(connection, navigate),
      );
    },
    [connection, account, navigate],
  );

  return (
    <div
      style={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <form
        style={{
          width: '400px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onSubmit={onSubmit}
      >
        <input
          name="name"
          type="text"
          placeholder="이름"
          autoComplete="off"
          value={account.name}
          onChange={onChange}
        />
        <input
          name="email"
          type="email"
          placeholder="이메일"
          autoComplete="off"
          value={account.email}
          onChange={onChange}
        />
        <input
          name="password"
          type="password"
          placeholder="비밀번호"
          autoComplete="off"
          value={account.password}
          onChange={onChange}
        />
        <input
          name="confirmPassword"
          type="password"
          placeholder="비밀번호 확인"
          autoComplete="off"
          value={account.confirmPassword}
          onChange={onChange}
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};
