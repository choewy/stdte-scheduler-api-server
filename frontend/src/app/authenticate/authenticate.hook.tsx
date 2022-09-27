import { ROUTER } from '@/configs';
import { apiState } from '@/utils/apis';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState, useRecoilValue } from 'recoil';
import { authenticateState, AuthenticateUserState } from './authenticate.state';

export const useAuthenticateWatch = () => {
  const navigate = useNavigate();
  const { authApi } = useRecoilValue(apiState);
  const setState = useSetRecoilState(authenticateState);

  const checkAuth = useCallback(async () => {
    try {
      const data = await authApi.auth();
      setState((prev) => ({
        ...prev,
        user: Object.assign(new AuthenticateUserState(), data),
      }));
      navigate(ROUTER.home, { replace: true });
    } catch (e) {}
  }, [authApi]);

  useEffect(() => {
    checkAuth();
    return () => {};
  }, [checkAuth]);
};
