import {
  AuthResponseData,
  AuthRoleData,
  AuthTeamData,
  UserStatus,
} from '@/utils/apis/auth';
import { atom } from 'recoil';

export class AuthenticateState implements AuthResponseData {
  login: boolean | null = null;
  username: string = '';
  nickname: string = '';
  email: string | null = null;
  status: UserStatus | null = null;
  roles: AuthRoleData[] = [];
  teams: AuthTeamData[] = [];
  createdAt: string = '';
  updatedAt: string = '';

  constructor(user?: AuthResponseData) {
    if (user) {
      this.login = true;
      this.username = user.username;
      this.nickname = user.nickname;
      this.email = user.email;
      this.status = user.status;
      this.roles = user.roles;
      this.teams = user.teams;
      this.createdAt = user.createdAt;
      this.updatedAt = user.updatedAt;
    } else {
      this.login = false;
    }
  }
}

export const authenticateState = atom<AuthenticateState>({
  key: 'authenticate',
  default: new AuthenticateState(),
});
