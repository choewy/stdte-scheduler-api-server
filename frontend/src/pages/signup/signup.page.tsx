import { FC, FormEvent, useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { AxiosError } from 'axios';
import { errorState } from '@/components';
import { SignUpState, signUpState } from './signup.state';
import { saveTokens } from '@/utils/cookie';
import { ROUTER } from '@/configs';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/utils/apis';
import { SignUpHelmet } from './signup.helmet';
import { Typography } from '@mui/material';
import {
  CustomButtom,
  CustomCardBox,
  CustomForm,
  CustomInput,
  useInputChangeEvent,
} from '@/components/elements';

export const SignUpPage: FC = () => {
  const navigate = useNavigate();
  const setError = useSetRecoilState(errorState);

  const [state, setState] = useRecoilState(signUpState);

  const onChange = useInputChangeEvent(setState);
  const onSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const data = await authApi.signup({
          username: state.username.value as string,
          password: state.password.value as string,
          confirmPassword: state.confirmPassword.value as string,
          nickname: state.nickname.value as string,
          email: state.email.value as string,
        });
        saveTokens(data);
        setState(new SignUpState());
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
    <CustomCardBox>
      <SignUpHelmet />
      <Typography
        variant="h5"
        component="div"
        style={{
          textAlign: 'center',
          margin: '0 0 10px',
        }}
      >
        회원가입
      </Typography>
      <CustomForm onSubmit={onSubmit}>
        {Object.keys(state).map((key) => {
          const props = state[key as keyof SignUpState];
          return (
            <CustomInput {...props} value={props.value} onChange={onChange} />
          );
        })}
        <CustomButtom type="submit">회원가입</CustomButtom>
      </CustomForm>
    </CustomCardBox>
  );
};
