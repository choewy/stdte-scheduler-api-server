export enum RoutePath {
  Home = '/',
  SignIn = '/signin',
  SignUp = '/signup',
  SignOut = '/signout',
  Roles = '/roles',
  Teams = '/teams',
}

export enum RouteRolePath {
  Root = '',
  Role = ':rid',
}

export enum RouteTeamPath {
  Root = '',
  Team = ':tid',
}
