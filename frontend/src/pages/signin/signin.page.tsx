import { AxiosError } from 'axios';
import { FC, FormEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { SignInState, signInState } from './signin.state';
import { CustomCardBox, errorState } from '@/components';
import { saveTokens } from '@/utils/cookie';
import { ROUTER } from '@/configs';
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
