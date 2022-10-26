import { SetterOrUpdater } from 'recoil';
import { RoleType } from '../states';

export const useRoleCreateSyncListener =
  (setRoles: SetterOrUpdater<RoleType[]>) => (row: RoleType) => {
    setRoles((prev) => [...prev, row]);
  };

export const useRoleUpdateSyncListener =
  (setRoles: SetterOrUpdater<RoleType[]>) => (row: RoleType) => {
    setRoles((prev) => {
      return prev.map((prev) => (prev.rid === row.rid ? row : prev));
    });
  };

export const useRoleDeleteSyncLisetner =
  (setRoles: SetterOrUpdater<RoleType[]>) => (rid: number) => {
    setRoles((prev) => {
      return prev.filter((prev) => prev.rid !== rid);
    });
  };
