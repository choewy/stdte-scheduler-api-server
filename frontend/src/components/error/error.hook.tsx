import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { ErrorState, errorState } from './error.state';

export const userErrorTImeout = () => {
  const [error, setError] = useRecoilState(errorState);

  useEffect(() => {
    const timer = setTimeout(() => {
      setError(new ErrorState());
    }, 3000);

    return clearTimeout(timer);
  }, [setError]);

  return { error, setError };
};
