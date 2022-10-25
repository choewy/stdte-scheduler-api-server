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
  users: [],
};

export const rolePolicyLabel = {
  read_team: '부서 조회',
  write_team: '부서 생성',
  update_team: '부서 수정',
  delete_team: '부서 삭제',
  read_member: '부서원 조회',
  write_member: '부서원 생성',
  update_member: '부서원 수정',
  delete_member: '부서원 삭제',
  read_task: '업무 조회',
  write_task: '업무 생성',
  update_task: '업무 수정',
  delete_task: '업무 삭제',
};
