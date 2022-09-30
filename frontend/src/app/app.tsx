import { FC, Fragment } from 'react';
import { ROUTER } from '@/configs';
import { Route, Routes } from 'react-router-dom';
import { Authenticate } from '@/app/authenticate';
import { BackNavigator, GlobalNavigator, RouteComponent } from '@/components';
import {
  HomePage,
  BlockPage,
  WaitPage,
  SignInPage,
  SignUpPage,
  SignOutPage,
  UserDetailPage,
  UserListPage,
} from '@/pages';
import { AppHelmet } from './app.helmet';
import { AppGlobalNavigationBar } from './global-navigation-bar';
import { AppGlobalSideBar } from './global-side-bar';
import { AppLayout } from './app.styled.component';

export const App: FC = () => {
  return (
    <AppLayout>
      <AppHelmet />
      <AppGlobalNavigationBar />
      <AppGlobalSideBar />
      <Authenticate />
      <Routes>
        <Route
          path={ROUTER.home}
          element={<RouteComponent Component={HomePage} />}
        />
        <Route
          path={ROUTER.block}
          element={<RouteComponent Component={BlockPage} block={true} />}
        />
        <Route
          path={ROUTER.wait}
          element={<RouteComponent Component={WaitPage} wait={true} />}
        />
        <Route
          path={ROUTER.signin}
          element={<RouteComponent Component={SignInPage} login={false} />}
        />
        <Route
          path={ROUTER.signup}
          element={<RouteComponent Component={SignUpPage} login={false} />}
        />
        <Route
          path={ROUTER.signout}
          element={<RouteComponent Component={SignOutPage} login={true} />}
        />
        <Route path={ROUTER.users}>
          <Route
            path=""
            element={<RouteComponent Component={UserListPage} login={true} />}
          />
          <Route
            path=":id"
            element={<RouteComponent Component={UserDetailPage} login={true} />}
          />
        </Route>
        <Route path="*" element={<BackNavigator />} />
      </Routes>
    </AppLayout>
  );
};
