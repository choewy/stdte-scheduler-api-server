import { SetterOrUpdater } from 'recoil';
import { RoleStateType, RoleType } from '../states';

export const useRoleCreateSyncListener =
  (setRoles: SetterOrUpdater<RoleStateType>) => (row: RoleType) => {
    setRoles((prev) => ({
      load: false,
      rows: [...prev.rows, row],
    }));
  };

export const useRoleUpdateSyncListener =
  (setRoles: SetterOrUpdater<RoleStateType>) => (row: RoleType) => {
    setRoles((prev) => {
      return {
        load: false,
        rows: prev.rows.map((prevRow) =>
          prevRow.rid === row.rid ? row : prevRow,
        ),
      };
    });
  };

export const useRoleDeleteSyncLisetner =
  (setRoles: SetterOrUpdater<RoleStateType>) => (rid: number) => {
    setRoles((prev) => {
      return {
        load: false,
        rows: prev.rows.filter((prevRow) => prevRow.rid !== rid),
      };
    });
  };
