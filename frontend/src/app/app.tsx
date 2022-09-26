import { ROUTER } from '@/configs';
import { LoginPage } from '@/pages';
import { FC } from 'react';
import { Route, Routes } from 'react-router-dom';

export const App: FC = () => {
  return (
    <Routes>
      <Route path={ROUTER.signin} element={<LoginPage />} />
    </Routes>
  );
};
