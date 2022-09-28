import {
  AuthResponseData,
  AuthRoleData,
  AuthTeamData,
} from '@/utils/apis/auth';
import { atom } from 'recoil';

export class AuthenticateState implements AuthResponseData {
  login: boolean = false;
  username: string = '';
  nickname: string = '';
  email: string | null = null;
  status: boolean | null = null;
  roles: AuthRoleData[] = [];
  teams: AuthTeamData[] = [];

  constructor(user?: AuthResponseData) {
    if (user) {
      this.login = true;
      this.username = user.username;
      this.nickname = user.nickname;
      this.email = user.email;
      this.status = user.status;
      this.roles = user.roles;
      this.teams = user.teams;
    } else {
      this.login = false;
    }
  }
}

export const authenticateState = atom<AuthenticateState>({
  key: 'authenticate',
  default: new AuthenticateState(),
});
