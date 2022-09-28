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
  policy: {
    default: boolean | null;
    master: boolean | null;
    admin: boolean | null;
    manager: boolean | null;
    member: boolean | null;
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
  status: boolean | null;
  roles: Array<AuthRoleData>;
  teams: Array<AuthTeamData>;
}
