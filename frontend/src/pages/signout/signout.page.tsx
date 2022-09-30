import { FC, useEffect } from 'react';
import { ROUTER } from '@/configs';
import { removeTokens } from '@/utils/cookie';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { authenticateState } from '@/app/authenticate';

export const SignOutPage: FC = () => {
  const navigate = useNavigate();
  const resetState = useResetRecoilState(authenticateState);

  useEffect(() => {
    removeTokens();
    resetState();
    navigate(ROUTER.signin, { replace: true });
    return () => {};
  }, []);

  return <></>;
};
