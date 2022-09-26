import { FC, PropsWithChildren } from 'react';
import { ErrorAlert } from './error.alert';

export const ErrorController: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <ErrorAlert />
      {children}
    </>
  );
};
