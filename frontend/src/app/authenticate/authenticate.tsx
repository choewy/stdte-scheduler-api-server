import { FC, Fragment } from 'react';
import { useAuthenticateGuard } from './authenticate.guard';
import { useAuthenticateWatch } from './authenticate.hook';

export const Authenticate: FC = () => {
  useAuthenticateWatch();
  useAuthenticateGuard();
  return <Fragment></Fragment>;
};
