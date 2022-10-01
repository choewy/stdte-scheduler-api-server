import { FC, useEffect } from 'react';
import { ROUTER } from '@/configs';
import { removeTokens } from '@/utils/cookie';
import { useNavigate } from 'react-router-dom';
import { useResetRecoilState } from 'recoil';
import { authenticateState } from '@/app/authenticate';
import { emitUserSignOutEvent } from '@/events';

export const SignOutPage: FC = () => {
  const navigate = useNavigate();
  const resetState = useResetRecoilState(authenticateState);

  useEffect(() => {
    removeTokens();
    resetState();
    emitUserSignOutEvent();
    navigate(ROUTER.signin, { replace: true });
    return () => {};
  }, []);

  return <></>;
};