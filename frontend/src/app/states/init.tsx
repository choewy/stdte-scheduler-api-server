import { AuthorizeStateType } from './types';

export const initAuthorizeState: AuthorizeStateType = {
  uid: 0,
  name: '',
  email: '',
  role: {
    delete_member: false,
    delete_task: false,
    delete_team: false,
    is_admin: false,
    read_member: false,
    read_task: false,
    read_team: false,
    update_member: false,
    update_task: false,
    update_team: false,
    write_member: false,
    write_task: false,
    write_team: false,
  },
};
