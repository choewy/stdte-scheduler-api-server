import { FC, PropsWithChildren } from 'react';
import { AlertSnackbar } from './alert.snackbar';

export const AlertContainer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <AlertSnackbar />
      {children}
    </>
  );
};
