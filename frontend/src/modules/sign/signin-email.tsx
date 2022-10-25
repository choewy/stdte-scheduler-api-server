import { FC, ChangeEvent, useState } from 'react';
import { useAuthSubmitCallback } from './hooks';
import { useMountConnection } from '@/app/hooks';

export const SignInWithEmailPage: FC = () => {
  const connection = useMountConnection();

  const [account, setAccount] = useState({
    email: '',
    password: '',
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
          event: 'auth:signin-email',
          redirect: '/',
        })}
      >
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
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};
