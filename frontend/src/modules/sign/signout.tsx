import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { RoutePath, authorizeState } from '@/app';
import { useSignConnection } from './hooks';

export const SignOutPage = () => {
  const navigate = useNavigate();
  const connection = useSignConnection();
  const resetAuthorize = useResetRecoilState(authorizeState);

  useEffect(() => {
    connection.removeTokens();
    resetAuthorize();
    navigate(RoutePath.SignIn, { replace: true });
  }, [connection, resetAuthorize, navigate]);

  return <></>;
};
