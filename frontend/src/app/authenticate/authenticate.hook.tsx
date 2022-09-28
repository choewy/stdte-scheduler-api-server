import { ROUTER } from '@/configs';
import { authApi } from '@/utils/apis';
import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import { AuthenticateState, authenticateState } from './authenticate.state';

export const useAuthenticateWatch = () => {
  const location = useLocation();
  const setState = useSetRecoilState(authenticateState);
  const checkAuth = useCallback(async () => {
    try {
      const data = await authApi.auth();
      setState(new AuthenticateState(data));
    } catch (e) {
      setState(new AuthenticateState());
    }
  }, []);

  useEffect(() => {
    if (location.pathname === ROUTER.home) {
      return;
    }

    checkAuth();

    return () => {};
  }, [checkAuth, location]);
};
