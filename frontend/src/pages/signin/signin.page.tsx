import { FC, FormEvent, useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { AxiosError } from 'axios';
import { errorState } from '@/components';
import { apiState } from '@/utils/apis';
import { CustomInput, useInputChangeEvent } from '@/components/elements';
import { SignInState, signInState } from './signin.state';

export const SignInPage: FC = () => {
  const setError = useSetRecoilState(errorState);
  const { authApi } = useRecoilValue(apiState);
  const [state, setState] = useRecoilState(signInState);

  const onChange = useInputChangeEvent(setState);
  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await authApi.signin({
          username: state.username.value as string,
          password: state.password.value as string,
        });
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
        {Object.keys(state).map((key) => {
          const props = state[key as keyof SignInState];
          return (
            <CustomInput {...props} value={props.value} onChange={onChange} />
          );
        })}
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};
