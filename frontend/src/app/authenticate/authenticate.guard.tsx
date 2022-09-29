import { ROUTER } from '@/configs';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useLocation, useNavigate } from 'react-router-dom';
import { authenticateState } from './authenticate.state';
import { UserStatus } from '@/utils/apis';

export const useAuthenticateGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = useRecoilValue(authenticateState);

  useEffect(() => {
    if (state.login === null) {
      const PASS = [ROUTER.home, ROUTER.signin, ROUTER.signup];
      if (!PASS.includes(location.pathname)) {
        navigate(ROUTER.signin, { replace: true });
      }

      return;
    }

    if (state.status === UserStatus.Wait) {
      if (location.pathname !== ROUTER.wait) {
        navigate(ROUTER.wait, { replace: true });
      }

      return;
    }

    if (state.status === UserStatus.Disable) {
      if (location.pathname !== ROUTER.block) {
        navigate(ROUTER.block, { replace: true });
      }

      return;
    }

    if (state.status === UserStatus.Enable) {
      switch (location.pathname) {
        case ROUTER.signin:
        case ROUTER.signup:
        case ROUTER.block:
        case ROUTER.wait:
          navigate(ROUTER.home, { replace: true });
          break;
      }

      return;
    }
  }, [state, location]);
};
