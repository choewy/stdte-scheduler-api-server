import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from 'recoil';
import { authorizeState, connectionState, exceptionState } from '../states';
import { isIncludeSignPathname } from './helpers';

export const useRootConnection = () => {
  const navigate = useNavigate();

  const connection = useRecoilValue(connectionState);
  const setAuthorize = useSetRecoilState(authorizeState);
  const resetAuthorize = useResetRecoilState(authorizeState);
  const setException = useSetRecoilState(exceptionState);

  useEffect(() => {
    connection.connect();
    connection.authorize(async (user) => {
      if (!user) {
        navigate('/signin/email', {
          replace: true,
        });

        return;
      }

      setAuthorize(user);
    });

    connection.exception(async (error) => {
      if (error.status === 401) {
        const { pathname } = window.location;

        switch (error.error) {
          case 'Unauthorized':
          case 'NotFound':
            connection.removeTokens();

            if (!isIncludeSignPathname(pathname)) {
              setException('로그인이 필요한 페이지입니다.');
              resetAuthorize();
              navigate('/signin/email', {
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
    });
  }, [connection, navigate, setAuthorize, resetAuthorize, setException]);
};
