import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { connectionState } from '@/app/states';
import { rolesState } from '../states';
import { RoleEvent } from '../enums';
import { useRoleAllCallback } from './callbacks';
import {
  useRoleCreateSyncListener,
  useRoleDeleteSyncLisetner,
  useRoleUpdateSyncListener,
} from './listeners';

export const useRolesConnection = () => {
  const connection = useRecoilValue(connectionState);
  const setRoles = useSetRecoilState(rolesState);

  useEffect(() => {
    connection.on(RoleEvent.OnCreateSync, useRoleCreateSyncListener(setRoles));
    connection.on(RoleEvent.OnUpdateSync, useRoleUpdateSyncListener(setRoles));
    connection.on(RoleEvent.OnDeleteSync, useRoleDeleteSyncLisetner(setRoles));
    connection.emit(RoleEvent.EmitAll, useRoleAllCallback(setRoles));

    return connection.clean();
  }, [connection, setRoles]);

  return connection;
};
