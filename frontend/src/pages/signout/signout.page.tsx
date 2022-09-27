import { FC, useEffect } from 'react';
import { ROUTER } from '@/configs';
import { removeTokens } from '@/utils/cookie';
import { useNavigate } from 'react-router-dom';

export const SignOutPage: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    removeTokens();
    navigate(ROUTER.signin, { replace: true });
    return () => {};
  }, []);

  return <></>;
};
