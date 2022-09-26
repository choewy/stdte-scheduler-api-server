import { FC } from 'react';
import { ROUTER } from '@/configs';
import { Route, Routes } from 'react-router-dom';
import { useAppAuthCheck, useAppAuthGuard } from './app.hook';
import { SignInPage } from '@/pages';
import { SignUpPage } from '@/pages/signup';

export const App: FC = () => {
  useAppAuthCheck();
  useAppAuthGuard();

  return (
    <Routes>
      <Route path={ROUTER.signin} element={<SignInPage />} />
      <Route path={ROUTER.signup} element={<SignUpPage />} />
    </Routes>
  );
};
