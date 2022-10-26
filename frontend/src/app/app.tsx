import {
  SignInPage,
  SignOutPage,
  SignUpPage,
  RolesPage,
  RolePage,
  TeamsPage,
} from '@/modules';
import { CSSProperties, FC, Fragment } from 'react';
import { Link, Route, Routes } from 'react-router-dom';
import { AppException } from './components';
import { RoutePath, RouteRolePath, RouteTeamPath } from './enums';
import { useRootConnection } from './hooks';

const linkStyle: CSSProperties = {
  padding: '5px',
  boxSizing: 'border-box',
};

export const App: FC = () => {
  useRootConnection();

  return (
    <Fragment>
      <AppException />

      <Link to={RoutePath.Home} style={linkStyle}>
        Home
      </Link>
      <Link to={RoutePath.SignUp} style={linkStyle}>
        SignUp
      </Link>
      <Link to={RoutePath.SignIn} style={linkStyle}>
        SignIn
      </Link>
      <Link to={RoutePath.SignOut} style={linkStyle}>
        SignOut
      </Link>
      <Link to={RoutePath.Roles} style={linkStyle}>
        Role
      </Link>
      <Link to={RoutePath.Teams} style={linkStyle}>
        Team
      </Link>

      <Routes>
        <Route path={RoutePath.Home} element={<div>HOME</div>} />
        <Route path={RoutePath.SignUp} element={<SignUpPage />} />
        <Route path={RoutePath.SignIn} element={<SignInPage />} />
        <Route path={RoutePath.SignOut} element={<SignOutPage />} />

        <Route path={RoutePath.Roles}>
          <Route path={RouteRolePath.Root} element={<RolesPage />} />
          <Route path={RouteRolePath.Role} element={<RolePage />} />
        </Route>

        <Route path={RoutePath.Teams}>
          <Route path={RouteTeamPath.Root} element={<TeamsPage />} />
          <Route path={RouteTeamPath.Team} element={<div></div>} />
        </Route>
      </Routes>
    </Fragment>
  );
};
