import { authorizeState, connectionState } from '@/app/states';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState } from 'recoil';

export const SignOutPage = () => {
  const navigate = useNavigate();
  const connection = useRecoilValue(connectionState);
  const resetAuthorize = useResetRecoilState(authorizeState);

  useEffect(() => {
    connection.removeTokens();
    resetAuthorize();
    navigate('/signin', { replace: true });
  }, [connection, resetAuthorize, navigate]);

  return <></>;
};
