import { ROUTER } from '@/configs';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import { authenticateState } from './authenticate.state';

export const useAuthenticateGuard = () => {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useRecoilValue(authenticateState);

  useEffect(() => {
    if (user.status === false) {
      navigate(ROUTER.block, { replace: true });
    }

    if (user.status === true) {
      switch (pathname) {
        case ROUTER.signin:
        case ROUTER.signup:
        case ROUTER.block:
          navigate(ROUTER.home, { replace: true });
          break;
      }
    }
    return () => {};
  }, [pathname]);
};
