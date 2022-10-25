import {
  SignInWithEmailPage,
  SignOutPage,
  SignUpPage,
  RolesPage,
  RolePage,
} from '@/modules';
import { FC, Fragment } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { AppException } from './components';
import { useRootConnection } from './hooks';

export const App: FC = () => {
  useRootConnection();

  return (
    <Fragment>
      <AppException />
      <Link to="/">Home</Link>
      <Link to="/signup">SignUp</Link>
      <Link to="/signin/email">SignInWithEmail</Link>
      <Link to="/signout">SignOut</Link>
      <Link to="/roles">Role</Link>
      <Routes>
        <Route path="/" element={<div>HOME</div>} />
        <Route path="signup" element={<SignUpPage />} />
        <Route path="signin/email" element={<SignInWithEmailPage />} />
        <Route path="signout" element={<SignOutPage />} />
        <Route path="roles" element={<RolesPage />} />
        <Route path="roles/:rid" element={<RolePage />} />
      </Routes>
    </Fragment>
  );
};
