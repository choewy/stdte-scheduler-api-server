import { AxiosError } from 'axios';
import { FC, FormEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { CustomForm, CustomInput, useInputChangeEvent } from '@/components';
import { SignInState, signInState } from './signin.state';
import { errorState } from '@/components';
import { saveTokens } from '@/utils/cookie';
import { ROUTER } from '@/configs';
import { authApi } from '@/utils/apis';

export const SignInPage: FC = () => {
  const navigate = useNavigate();
  const setError = useSetRecoilState(errorState);
  const [state, setState] = useRecoilState(signInState);

  const onChange = useInputChangeEvent(setState);
  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const data = await authApi.signin({
          username: state.username.value as string,
          password: state.password.value as string,
        });
        saveTokens(data);
        setState(new SignInState());
        navigate(ROUTER.home, { replace: true });
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
      <CustomForm onSubmit={onSubmit}>
        {Object.keys(state).map((key) => {
          const props = state[key as keyof SignInState];
          return (
            <CustomInput {...props} value={props.value} onChange={onChange} />
          );
        })}
        <button type="submit">로그인</button>
      </CustomForm>
    </div>
  );
};
