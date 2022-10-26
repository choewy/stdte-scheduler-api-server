import { RoutePath } from '@/app/enums';
import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { SetterOrUpdater } from 'recoil';
import { RoleStateType, RoleType, RoleUserType } from '../states';

export const useRoleAllCallback =
  (setRoles: SetterOrUpdater<RoleStateType>) => async (rows: RoleType[]) => {
    setRoles({
      load: false,
      rows,
    });
  };

export const useRoleDeleteCallback =
  (navigate: NavigateFunction) => async () => {
    navigate(RoutePath.Roles, { replace: true });
  };

export const useRoleSearchUserCallback =
  (setUsers: Dispatch<SetStateAction<RoleUserType[]>>) =>
  async (rows: RoleUserType[]) => {
    setUsers(rows);
  };

export const useRoleMemberAppendCallback =
  (
    uid: number,
    users: RoleUserType[],
    setUsers: Dispatch<SetStateAction<RoleUserType[]>>,
  ) =>
  async () => {
    setUsers(users.filter((user) => user.uid !== uid));
  };
