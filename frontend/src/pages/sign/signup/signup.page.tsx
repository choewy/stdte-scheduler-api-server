import { FC, FormEvent } from 'react';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { alertState } from '@/app';
import { SignUpState, signUpState } from './signup.state';
import { useNavigate } from 'react-router-dom';
import { authApi } from '@/apis';
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

  const [state, setState] = useRecoilState(signUpState);
  const resetState = useResetRecoilState(signUpState);
  const setAlert = useSetRecoilState(alertState);

  const onChange = useInputChangeEvent(setState);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      username: state.username.value as string,
      password: state.password.value as string,
      confirmPassword: state.confirmPassword.value as string,
      nickname: state.nickname.value as string,
      email: (state.email.value as string) || undefined,
    };

    await authApi.signup(body, {
      navigate,
      resetState,
      setAlert,
    });
  };

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
