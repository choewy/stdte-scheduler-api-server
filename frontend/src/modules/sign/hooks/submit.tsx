import { connectionState } from '@/app/states';
import { SocketInstance } from '@/utils';
import { FormEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { TokenType, userState, UserType } from '../states';

export type Props = {
  connection: SocketInstance;
  account: {
    name?: string;
    email: string;
    password: string;
    confirmPassword?: string;
  };
  event: 'auth:signup' | 'auth:signin-email';
  redirect: '/';
};

export const useAuthSubmitCallback = ({
  connection,
  account,
  event,
  redirect,
}: Props) => {
  const navigate = useNavigate();
  const setUser = useSetRecoilState(userState);

  const callback = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await connection.emit(
        event,
        account,
        (data: { user: UserType; tokens: TokenType }) => {
          setUser(data.user);
          connection.setTokens(data.tokens);
          navigate(redirect, { replace: true });
        },
      );
    },
    [connection, setUser, navigate, account],
  );

  return callback;
};
