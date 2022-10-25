import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { connectionState } from '../states';

export const useMountConnection = () => {
  const connection = useRecoilValue(connectionState);

  useEffect(() => {
    connection.connect();
    return connection.clean();
  }, []);

  return connection;
};
