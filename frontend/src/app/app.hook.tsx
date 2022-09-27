import { apiState } from '@/utils/apis';
import { useCallback, useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { appState, AppUserState } from './app.state';

export const useAppAuthCheck = () => {
  const { authApi } = useRecoilValue(apiState);
  const setState = useSetRecoilState(appState);

  const checkAuth = useCallback(async () => {
    const response = await authApi.auth();

    if (response?.data) {
      setState((prev) => ({
        ...prev,
        user: Object.assign(new AppUserState(), response.data),
      }));
    }
  }, [authApi]);

  useEffect(() => {
    checkAuth();
    return () => {};
  }, [checkAuth]);
};
