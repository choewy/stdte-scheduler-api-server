import { SignInWithEmailPage, SignUpPage } from '@/modules';
import { FC, Fragment } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { AppException } from './components';
import { useRootConnection } from './hooks';

export const App: FC = () => {
  useRootConnection();

  return (
    <Fragment>
      <AppException />
      <Link to="/">HOME</Link>
      <Link to="/signup">SignUp</Link>
      <Link to="/signin/email">SignInWithEmail</Link>
      <Routes>
        <Route path="/" element={<div>HOME</div>} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="signin/email" element={<SignInWithEmailPage />} />
      </Routes>
    </Fragment>
  );
};
