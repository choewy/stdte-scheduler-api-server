import { NavigateFunction } from 'react-router-dom';
import { SetterOrUpdater } from 'recoil';
import { SocketAuthorizeHandler } from '@/utils';
import { RoutePath } from '../enums';
import { AuthorizeState } from '../states';

export const useAuthorizeCallback =
  (
    navigate: NavigateFunction,
    setAuthorize: SetterOrUpdater<AuthorizeState>,
  ): SocketAuthorizeHandler =>
  async (user) => {
    if (!user) {
      navigate(RoutePath.SignIn, {
        replace: true,
      });

      return;
    }

    setAuthorize(user);
  };
