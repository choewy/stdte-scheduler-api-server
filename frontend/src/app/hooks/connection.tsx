import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { authorizeState, connectionState, exceptionState } from '../states';
import { useAuthorizeCallback } from './callbacks';
import { useExceptionListener } from './listeners';

export const useAppConnection = () => {
  const navigate = useNavigate();
  const connection = useRecoilValue(connectionState);
  const setAuthorize = useSetRecoilState(authorizeState);
  const resetAuthorize = useResetRecoilState(authorizeState);
  const setException = useSetRecoilState(exceptionState);

  useEffect(() => {
    connection.connect();
    connection.authorize(useAuthorizeCallback(navigate, setAuthorize));
    connection.exception(
      useExceptionListener(navigate, connection, setException, resetAuthorize),
    );
  }, [connection, navigate, setAuthorize, resetAuthorize, setException]);
};
