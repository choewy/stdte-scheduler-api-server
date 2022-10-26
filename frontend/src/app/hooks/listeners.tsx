import { NavigateFunction } from 'react-router-dom';
import { Resetter, SetterOrUpdater } from 'recoil';
import { SocketExceptionHandler, SocketInstance } from '@/utils';
import { RoutePath } from '../enums';
import { isIncludeSignPathname } from './helpers';

export const useExceptionListener =
  (
    navigate: NavigateFunction,
    connection: SocketInstance,
    setException: SetterOrUpdater<string>,
    resetAuthorize: Resetter,
  ): SocketExceptionHandler =>
  async (error) => {
    if (error.status === 401) {
      const { pathname } = window.location;

      switch (error.error) {
        case 'Unauthorized':
        case 'NotFound':
          connection.removeTokens();

          if (!isIncludeSignPathname(pathname)) {
            setException('로그인이 필요한 페이지입니다.');
            resetAuthorize();
            navigate(RoutePath.SignIn, {
              replace: true,
            });
          }

          return;

        case 'BadRequest':
          await connection.refresh();

          return;
      }
    }

    setException(error.message);
  };
