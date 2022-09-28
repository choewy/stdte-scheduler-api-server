import { ROUTER } from '@/configs';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import { authenticateState } from './authenticate.state';

export const useAuthenticateGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = useRecoilValue(authenticateState);

  useEffect(() => {
    if (state.status === false) {
      navigate(ROUTER.block, { replace: true });
    }

    if (state.status === true) {
      switch (location.pathname) {
        case ROUTER.signin:
        case ROUTER.signup:
        case ROUTER.block:
          navigate(ROUTER.home, { replace: true });
          break;
      }
    }
    return () => {};
  }, [state, location]);
};
