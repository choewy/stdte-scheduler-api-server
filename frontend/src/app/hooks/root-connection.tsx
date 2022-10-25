import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { authorizeState, connectionState, exceptionState } from '../states';

export const useRootConnection = () => {
  const navigate = useNavigate();

  const connection = useRecoilValue(connectionState);
  const setAuthorize = useSetRecoilState(authorizeState);
  const resetAuthorize = useResetRecoilState(authorizeState);
  const setException = useSetRecoilState(exceptionState);

  useEffect(() => {
    connection.connect();
    connection.authorize((user) => {
      if (!user) {
        navigate('/signin/email', {
          replace: true,
        });

        return;
      }

      setAuthorize(user);
    });

    connection.exception((error) => {
      if (error.status === 401) {
        switch (error.error) {
          case 'Unauthorized':
          case 'NotFound':
            connection.removeTokens();
            setException('다시 로그인하세요.');
            resetAuthorize();
            navigate('/signin/email', {
              replace: true,
            });
            return;

          case 'BadRequest':
            connection.refresh();
            return;
        }
      }

      setException(error.message);
    });
  }, [connection, navigate, setAuthorize, resetAuthorize, setException]);
};
