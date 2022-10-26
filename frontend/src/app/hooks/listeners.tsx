import { NavigateFunction } from 'react-router-dom';
import { SetterOrUpdater } from 'recoil';
import { SocketExceptionHandler, SocketInstance } from '@/utils';
import { AppEvent, RoutePath } from '../enums';
import { isIncludeSignPathname } from './helpers';
import { AuthorizeStateType, initAuthorizeState } from '../states';
import { TokenType } from '@/modules';

export const useExceptionListener =
  (
    navigate: NavigateFunction,
    connection: SocketInstance,
    setException: SetterOrUpdater<string>,
    setAuthorize: SetterOrUpdater<AuthorizeStateType>,
  ): SocketExceptionHandler =>
  async (error) => {
    if (error.status === 401) {
      const { pathname } = window.location;

      switch (error.error) {
        case 'Unauthorized':
        case 'NotFound':
          connection.removeTokens();
          if (!isIncludeSignPathname(pathname)) {
            setAuthorize({
              ...initAuthorizeState,
              uid: -1,
            });
            setException('로그인이 필요한 페이지입니다.');
            navigate(RoutePath.SignIn, {
              replace: true,
            });
          }

          return;

        case 'BadRequest':
          connection.emit(AppEvent.AuthorizeRefresh, (token: TokenType) => {
            connection.setTokens(token);
          });

          return;
      }
    }

    setException(error.message);
  };
