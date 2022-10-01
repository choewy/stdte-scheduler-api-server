import { PolicyRange, RoleType, UserStatus } from '@/apis';

export interface UpdateUserRequestBody {
  nickname?: string;
  password?: string;
  email?: string;
  status?: UserStatus;
}

export interface UserTeamData {
  id: Number;
  name: string;
}

export interface UserRoleData {
  id: number;
  name: string;
  type: RoleType;
  policy: {
    read: PolicyRange;
    write: PolicyRange;
    update: PolicyRange;
    delete: PolicyRange;
  };
}

export interface UserData {
  id: number;
  username: string;
  nickname: string;
  email: string | null;
  status: UserStatus;
  createdAt: string;
  updatedAt: string;
  disabledAt: string;
  roles: UserRoleData[];
  teams: UserTeamData[];
}
