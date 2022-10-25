import { FC, ChangeEvent, useState } from 'react';
import { useAuthSubmitCallback } from './hooks';
import { useMountConnection } from '@/app/hooks';

export const SignUpPage: FC = () => {
  const connection = useMountConnection();

  const [account, setAccount] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAccount({
      ...account,
      [name]: value,
    });
  };

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
        onSubmit={useAuthSubmitCallback({
          connection,
          account,
          event: 'auth:signup',
          redirect: '/',
        })}
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
