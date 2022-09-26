import { errorState } from '@/components';
import { apiState } from '@/utils/apis';
import { AxiosError } from 'axios';
import { ChangeEvent, FormEvent, useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { loginState } from './login.state';

export const LoginPage = () => {
  const setError = useSetRecoilState(errorState);
  const { authApi } = useRecoilValue(apiState);
  const [{ username, password }, setState] = useRecoilState(loginState);

  const onChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setState((prev) => ({ ...prev, [name]: value }));
    },
    [setState],
  );

  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await authApi.signin({ username, password });
      } catch (e) {
        const error = e as AxiosError;
        const { data } = error.response as any;
        setError({ message: data.message });
      }
    },
    [authApi, username, password, setError],
  );

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={onSubmit}>
        <input name="username" value={username} onChange={onChange} />
        <input name="password" value={password} onChange={onChange} />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};
