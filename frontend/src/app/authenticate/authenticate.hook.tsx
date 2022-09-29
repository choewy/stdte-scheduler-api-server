import { authApi } from '@/utils/apis';
import { useSetRecoilState } from 'recoil';
import { useCallback, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
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
    checkAuth();
  }, [checkAuth, location]);
};
