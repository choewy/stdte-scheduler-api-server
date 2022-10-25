import { useEffect } from 'react';
import { useSetRecoilState } from 'recoil';
import { useMountConnection } from '@/app/hooks';
import { rolesState, RoleType } from '../states';

export const useRolesConnection = () => {
  const connection = useMountConnection();
  const setRoles = useSetRecoilState(rolesState);

  useEffect(() => {
    connection.on('role:create:sync', (row: RoleType) => {
      setRoles((prev) => [...prev, row]);
    });

    connection.on('role:update:sync', (row: RoleType) => {
      setRoles((prev) => {
        return prev.map((prev) => (prev.rid === row.rid ? row : prev));
      });
    });

    connection.on('role:delete:sync', (rid: number) => {
      setRoles((prev) => {
        return prev.filter((prev) => prev.rid !== rid);
      });
    });

    connection.emit('role:all', (rows: RoleType[]) => setRoles(rows));

    return connection.clean();
  }, [connection, setRoles]);

  return connection;
};
