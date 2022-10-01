import { authenticateState } from '@/app/authenticate';
import { UserStatus } from '@/apis';
import { FC, Fragment } from 'react';
import { useRecoilValue } from 'recoil';

interface Props {
  Component: FC;
  login?: boolean;
  block?: boolean;
  wait?: boolean;
}

export const RouteComponent: FC<Props> = ({
  Component,
  login,
  block,
  wait,
}) => {
  const state = useRecoilValue(authenticateState);

  if (block === true) {
    return state.status === UserStatus.Disable ? <Component /> : <Fragment />;
  }

  if (wait === true) {
    return state.status === UserStatus.Wait ? <Component /> : <Fragment />;
  }

  if (login === false) {
    return state.login === false ? <Component /> : <Fragment />;
  }

  if (login === true) {
    return state.login === true ? <Component /> : <Fragment />;
  }

  return <Component />;
};
