export type RoleUserType = {
  uid: number;
  name: string;
  email: string;
};

export type RolePolicyType = {
  read_team: boolean;
  write_team: boolean;
  update_team: boolean;
  delete_team: boolean;

  read_member: boolean;
  write_member: boolean;
  update_member: boolean;
  delete_member: boolean;

  read_task: boolean;
  write_task: boolean;
  update_task: boolean;
  delete_task: boolean;
};

export type RoleType = {
  rid: number;
  name: string;
  members: RoleUserType[];
} & RolePolicyType;
