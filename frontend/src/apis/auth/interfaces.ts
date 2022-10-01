import { PolicyRange, RoleType, UserStatus } from './enums';

export interface SignInRequestBody {
  username: string;
  password: string;
}

export interface SignUpRequestBody {
  username: string;
  password: string;
  confirmPassword: string;
  nickname: string;
  email?: string;
}

export interface SignResponseData {
  accessToken: string;
  refreshToken: string;
}

export interface AuthRoleData {
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

export interface AuthTeamData {
  id: Number;
  name: string;
}

export interface AuthResponseData {
  username: string;
  email: string | null;
  nickname: string;
  status: UserStatus | null;
  roles: AuthRoleData[];
  teams: AuthTeamData[];
  createdAt: string;
  updatedAt: string;
}
