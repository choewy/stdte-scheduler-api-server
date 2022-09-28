import { authenticateState } from '@/app/authenticate';
import { FC, Fragment } from 'react';
import { useRecoilValue } from 'recoil';

interface Props {
  Component: FC;
  login?: boolean;
  block?: boolean;
}

export const RouteComponent: FC<Props> = ({ Component, login, block }) => {
  const state = useRecoilValue(authenticateState);

  if (block) {
    return state.status === false ? <Component /> : <Fragment />;
  }

  switch (login) {
    case true:
    case false:
      return state.login === login ? <Component /> : <Fragment />;

    default:
      return <Component />;
  }
};
