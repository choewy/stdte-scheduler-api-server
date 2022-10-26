import { RoutePath } from '@/app/enums';
import { SocketInstance } from '@/utils';
import { NavigateFunction } from 'react-router-dom';
import { TokenType } from '../states';

export const useSignCallback =
  (connection: SocketInstance, navigate: NavigateFunction) =>
  (data: TokenType) => {
    connection.setTokens(data);
    navigate(RoutePath.Home, { replace: true });
  };
