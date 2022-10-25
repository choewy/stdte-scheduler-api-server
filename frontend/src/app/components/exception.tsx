import { FC, useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { exceptionState } from '../states';

export const AppException: FC = () => {
  const [exception, setException] = useRecoilState(exceptionState);

  useEffect(() => {
    if (exception) {
      alert(exception);
    }

    setException('');
  }, [exception]);

  return <></>;
};
