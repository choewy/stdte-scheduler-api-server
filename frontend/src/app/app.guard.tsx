import { ROUTER } from '@/configs';
import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { appState } from './app.state';

export const useAppAuthGuard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useRecoilValue(appState);

  useEffect(() => {
    if (user.status === false) {
      navigate(ROUTER.block, { replace: true });
    }

    if (user.status === true) {
      switch (location.pathname) {
        case ROUTER.signin:
        case ROUTER.signup:
        case ROUTER.block:
          navigate(ROUTER.home, { replace: true });
          break;
      }
    }

    if (user.status === null) {
      switch (location.pathname) {
        case ROUTER.block:
          navigate(ROUTER.home, { replace: true });
          break;
      }
    }
  }, [user]);
};
