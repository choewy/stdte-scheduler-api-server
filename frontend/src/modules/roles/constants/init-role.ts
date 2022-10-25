import { RoleType } from './types';

export const initRoleState: RoleType = {
  rid: -1,
  name: '',
  read_team: false,
  write_team: false,
  update_team: false,
  delete_team: false,
  read_member: false,
  write_member: false,
  update_member: false,
  delete_member: false,
  read_task: false,
  write_task: false,
  update_task: false,
  delete_task: false,
  members: [],
};
