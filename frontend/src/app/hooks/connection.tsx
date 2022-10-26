import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import {
  authorizeState,
  connectionState,
  exceptionState,
  loadingState,
} from '../states';
import { useAuthorizeCallback } from './callbacks';
import { useExceptionListener } from './listeners';

export const useAppConnection = () => {
  const navigate = useNavigate();
  const connection = useRecoilValue(connectionState);
  const setAuthorize = useSetRecoilState(authorizeState);
  const setException = useSetRecoilState(exceptionState);
  const setLoading = useSetRecoilState(loadingState);

  useEffect(() => {
    setLoading(true);
    connection.connect();
    connection.authorize(useAuthorizeCallback(navigate, setAuthorize));
    connection.exception(
      useExceptionListener(navigate, connection, setException, setAuthorize),
    );
    setLoading(false);
  }, [connection, navigate, setAuthorize, setException]);
};
