import { ROUTER } from '@/configs';
import { apiState } from '@/utils/apis';
import { useCallback, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { appState, AppUserState } from './app.state';

export const useAppAuthCheck = () => {
  const { authApi } = useRecoilValue(apiState);
  const setState = useSetRecoilState(appState);

  const checkAuth = useCallback(async () => {
    const { data } = await authApi.auth();

    setState((prev) => ({
      ...prev,
      user: Object.assign(new AppUserState(), data),
    }));
  }, [authApi]);

  useEffect(() => {
    checkAuth();
    return () => {};
  }, [checkAuth]);
};

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
  }, [user]);
};
