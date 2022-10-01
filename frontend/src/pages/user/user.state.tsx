import { atom } from 'recoil';
import { UserStatus } from '@/apis';
import { UserResponseData, UserRoleData, UserTeamData } from '@/apis/user';

export class UserState implements UserResponseData {
  id: number = 0;
  username: string = '';
  nickname: string = '';
  email: string | null = null;
  status: UserStatus = UserStatus.Wait;
  roles: UserRoleData[] = [];
  teams: UserTeamData[] = [];
  createdAt: string = '';
  updatedAt: string = '';
  disabledAt: string = '';

  constructor(user?: UserResponseData) {
    if (user) {
      this.id = user.id;
      this.username = user.username;
      this.nickname = user.nickname;
      this.email = user.email;
      this.status = user.status;
      this.roles = user.roles;
      this.teams = user.teams;
      this.createdAt = user.createdAt;
      this.updatedAt = user.updatedAt;
      this.disabledAt = user.disabledAt;
    }
  }
}

export class UsersState {
  count: number = 0;
  rows: UserResponseData[] = [];

  constructor(users?: UserResponseData[]) {
    if (users) {
      this.count = users.length;
      this.rows = users;
    }
  }
}

export const userState = atom({
  key: 'user',
  default: new UsersState(),
});
