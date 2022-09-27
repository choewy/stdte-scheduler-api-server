import { FC, Fragment } from 'react';
import { ROUTER } from '@/configs';
import { Route, Routes } from 'react-router-dom';
import {
  HomePage,
  BlockPage,
  SignInPage,
  SignUpPage,
  SignOutPage,
} from '@/pages';
import { Authenticate } from '@/app/authenticate';
import { BackNavigator, GlobalNavigator } from '@/components';

export const App: FC = () => {
  return (
    <Fragment>
      <Authenticate />
      <GlobalNavigator />
      <Routes>
        <Route path={ROUTER.home} element={<HomePage />} />
        <Route path={ROUTER.block} element={<BlockPage />} />
        <Route path={ROUTER.signin} element={<SignInPage />} />
        <Route path={ROUTER.signup} element={<SignUpPage />} />
        <Route path={ROUTER.signup} element={<SignUpPage />} />
        <Route path={ROUTER.signout} element={<SignOutPage />} />
        <Route path="*" element={<BackNavigator />} />
      </Routes>
    </Fragment>
  );
};
