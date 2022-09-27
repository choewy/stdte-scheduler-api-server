import { FC, FormEvent, useCallback } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { AxiosError } from 'axios';
import { errorState } from '@/components';
import { apiState } from '@/utils/apis';
import { SignUpState, signUpState } from './signup.state';
import {
  CustomForm,
  CustomInput,
  useInputChangeEvent,
} from '@/components/elements';

export const SignUpPage: FC = () => {
  const setError = useSetRecoilState(errorState);
  const { authApi } = useRecoilValue(apiState);
  const [state, setState] = useRecoilState(signUpState);

  const onChange = useInputChangeEvent(setState);
  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        await authApi.signup({
          username: state.username.value as string,
          password: state.password.value as string,
          confirmPassword: state.confirmPassword.value as string,
          nickname: state.nickname.value as string,
          email: state.email.value as string,
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
      <h1>SignUp</h1>
      <CustomForm onSubmit={onSubmit}>
        {Object.keys(state).map((key) => {
          const props = state[key as keyof SignUpState];
          return (
            <CustomInput {...props} value={props.value} onChange={onChange} />
          );
        })}
        <button type="submit">회원가입</button>
      </CustomForm>
    </div>
  );
};
