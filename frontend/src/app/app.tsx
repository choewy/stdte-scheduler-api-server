import { FC, Fragment } from 'react';
import { Route, Routes } from 'react-router-dom';
import {
  SignInPage,
  SignOutPage,
  SignUpPage,
  RolesPage,
  RolePage,
  TeamsPage,
  TeamPage,
} from '@/modules';
import {
  AppExceptionComponent,
  AppHeaderComponent,
  AppLayoutComponent,
  AppLoadingComponent,
  AppSidebarComponent,
} from './components';
import { RoutePath, RouteRolePath, RouteTeamPath } from './enums';
import { useAppConnection } from './hooks';

export const App: FC = () => {
  useAppConnection();

  return (
    <Fragment>
      <AppHeaderComponent />
      <AppSidebarComponent />
      <AppExceptionComponent />
      <AppLoadingComponent />
      <AppLayoutComponent>
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
            <Route path={RouteTeamPath.Team} element={<TeamPage />} />
          </Route>
        </Routes>
      </AppLayoutComponent>
    </Fragment>
  );
};
