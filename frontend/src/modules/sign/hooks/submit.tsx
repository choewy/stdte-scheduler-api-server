import { SocketInstance } from '@/utils';
import { FormEvent, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { TokenType } from '../states';

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
  const callback = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      await connection.emit(event, account, (data: TokenType) => {
        connection.setTokens(data);
        navigate(redirect, { replace: true });
      });
    },
    [connection, navigate, account],
  );

  return callback;
};
