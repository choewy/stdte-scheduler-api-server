export type SocketErrorType = {
  status: number;
  error: string;
  message: string;
};

export type SocketUserRoleType = {
  delete_member: boolean;
  delete_task: boolean;
  delete_team: boolean;
  is_admin: boolean;
  read_member: boolean;
  read_task: boolean;
  read_team: boolean;
  update_member: boolean;
  update_task: boolean;
  update_team: boolean;
  write_member: boolean;
  write_task: boolean;
  write_team: boolean;
};

export type SocketAuthorizeType = {
  uid: number;
  name: string;
  email: string;
  role: SocketUserRoleType;
};
