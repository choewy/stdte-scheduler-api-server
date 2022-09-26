import { ROUTER } from '@/configs';
import { LoginPage } from '@/pages';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';
import { useAppAuthCheck, useAppAuthGuard } from './app.hook';

export const App: FC = () => {
  useAppAuthCheck();
  useAppAuthGuard();
  return (
    <Routes>
      <Route path={ROUTER.signin} element={<LoginPage />} />
    </Routes>
  );
};
