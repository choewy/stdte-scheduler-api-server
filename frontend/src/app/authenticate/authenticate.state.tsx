import { atom } from 'recoil';

export class AuthenticateUserTeamState {
  id: number = 0;
  name: string = '';
}

export class AuthenticateUserRolePolicyState {
  default: boolean | null = null;
  master: boolean | null = null;
  admin: boolean | null = null;
  manager: boolean | null = null;
  member: boolean | null = null;
}

export class AuthenticateUserRoleState {
  id: number = 0;
  name: string = '';
  policy = new AuthenticateUserRolePolicyState();
}

export class AuthenticateUserState {
  username: string = '';
  email: string | null = null;
  nickname: string = '';
  status: boolean | null = null;
  roles: AuthenticateUserRoleState[] = [];
  teams: AuthenticateUserTeamState[] = [];
}

export class AuthenticateState {
  user = new AuthenticateUserState();
}

export const authenticateState = atom<AuthenticateState>({
  key: 'authenticate',
  default: new AuthenticateState(),
});
