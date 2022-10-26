import { connectionState } from '@/app/states';
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';

export const useSignConnection = () => {
  const connection = useRecoilValue(connectionState);

  useEffect(() => {
    connection.connect();
    return connection.clean();
  }, [connection]);

  return connection;
};
