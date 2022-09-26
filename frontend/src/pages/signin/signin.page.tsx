import { errorState } from '@/components';
import { apiState } from '@/utils/apis';
import { AxiosError } from 'axios';
import { ChangeEvent, FormEvent, useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { signInState } from './login.state';

export const SignInPage = () => {
  const setError = useSetRecoilState(errorState);
  const { authApi } = useRecoilValue(apiState);
  const [state, setState] = useRecoilState(signInState);

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
        await authApi.signin(state);
      } catch (e) {
        const error = e as AxiosError;
        const { data } = error.response as any;
        setError({ message: data.message });
      }
    },
    [authApi, state, setError],
  );

  return (
    <div>
      <h1>SignIn</h1>
      <form
        onSubmit={onSubmit}
        style={{
          width: '300px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}
      >
        <input
          type="text"
          name="username"
          placeholder="아이디"
          value={state.username}
          onChange={onChange}
        />
        <input
          type="password"
          name="password"
          placeholder="비밀번호"
          value={state.password}
          onChange={onChange}
        />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};
