import { atom } from 'recoil';

export class AppUserTeamState {
  id: number = 0;
  name: string = '';
}

export class AppUserRolePolicyState {
  default: boolean | null = null;
  master: boolean | null = null;
  admin: boolean | null = null;
  manager: boolean | null = null;
  member: boolean | null = null;
}

export class AppUserRoleState {
  id: number = 0;
  name: string = '';
  policy = new AppUserRolePolicyState();
}

export class AppUserState {
  username: string = '';
  email: string | null = null;
  nickname: string = '';
  status: boolean | null = null;
  roles: AppUserRoleState[] = [];
  teams: AppUserTeamState[] = [];
}

export class AppState {
  user = new AppUserState();
}

export const appState = atom<AppState>({
  key: 'app',
  default: new AppState(),
});
