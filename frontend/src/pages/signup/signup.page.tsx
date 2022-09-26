import { errorState } from '@/components';
import { apiState } from '@/utils/apis';
import { AxiosError } from 'axios';
import { ChangeEvent, FC, FormEvent, useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { signUpState } from './signup.state';

export const SignUpPage: FC = () => {
  const setError = useSetRecoilState(errorState);
  const { authApi } = useRecoilValue(apiState);
  const [state, setState] = useRecoilState(signUpState);

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
        await authApi.signup(state);
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
      <h1>SignUp</h1>
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
        <input
          type="password"
          name="confirmPassword"
          placeholder="비밀번호 확인"
          value={state.confirmPassword}
          onChange={onChange}
        />
        <input
          type="text"
          name="nickname"
          placeholder="닉네임"
          value={state.nickname}
          onChange={onChange}
        />
        <input
          type="text"
          name="email"
          placeholder="이메일"
          value={state.email}
          onChange={onChange}
        />
        <button type="submit">회원가입</button>
      </form>
    </div>
  );
};
