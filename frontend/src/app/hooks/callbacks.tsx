import { NavigateFunction } from 'react-router-dom';
import { SetterOrUpdater } from 'recoil';
import { SocketAuthorizeHandler } from '@/utils';
import { RoutePath } from '../enums';
import { AuthorizeStateType } from '../states';

export const useAuthorizeCallback =
  (
    navigate: NavigateFunction,
    setAuthorize: SetterOrUpdater<AuthorizeStateType>,
  ): SocketAuthorizeHandler =>
  (user) => {
    if (user) {
      setAuthorize(user);
      return;
    }

    navigate(RoutePath.SignIn, {
      replace: true,
    });
  };
