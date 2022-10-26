export enum RoutePath {
  Home = '/',
  SignIn = '/signin',
  SignUp = '/signup',
  SignOut = '/signout',
  Accounts = '/accounts',
  Roles = '/roles',
  Teams = '/teams',
  Tasks = '/tasks',
  MyTeams = '/myteams',
  History = '/history',
}

export enum RouteRolePath {
  Root = '',
  Role = ':rid',
}

export enum RouteTeamPath {
  Root = '',
  Team = ':tid',
}

export enum AppEvent {
  AuthorizeRefresh = 'authorize:refresh',
}
