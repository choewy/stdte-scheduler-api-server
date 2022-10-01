import { FC, FormEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useResetRecoilState, useSetRecoilState } from 'recoil';
import { SignInState, signInState } from './signin.state';
import { CustomCardBox, alertState } from '@/components';
import { authApi } from '@/utils/apis';
import { SignInHelmet } from './signin.helmet';
import {
  useInputChangeEvent,
  CustomForm,
  CustomInput,
  CustomButtom,
} from '@/components';
import { Typography } from '@mui/material';

export const SignInPage: FC = () => {
  const navigate = useNavigate();

  const [state, setState] = useRecoilState(signInState);
  const resetState = useResetRecoilState(signInState);
  const setAlert = useSetRecoilState(alertState);

  const onChange = useInputChangeEvent(setState);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const body = {
      username: state.username.value as string,
      password: state.password.value as string,
    };

    await authApi.signin(body, {
      navigate,
      resetState,
      setAlert,
    });
  };

  return (
    <CustomCardBox>
      <SignInHelmet />
      <CustomForm onSubmit={onSubmit}>
        <Typography
          variant="h5"
          component="div"
          style={{
            textAlign: 'center',
            margin: '0 0 10px',
          }}
        >
          로그인
        </Typography>
        {Object.keys(state).map((key) => {
          const props = state[key as keyof SignInState];
          return (
            <CustomInput {...props} value={props.value} onChange={onChange} />
          );
        })}
        <CustomButtom type="submit">로그인</CustomButtom>
      </CustomForm>
    </CustomCardBox>
  );
};
