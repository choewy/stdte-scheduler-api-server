import { FC, useCallback } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { Box } from '@mui/material';
import { authorizeState, sidebarState } from '@/app/states';
import {
  AdminMenuListComponent,
  CommonMenuListComponent,
  VisitorMenuListComponent,
  UserMenuListComponent,
  UserButtonMenuListComponent,
} from './menus';

export const SidebarListComponent: FC = () => {
  const { uid, role } = useRecoilValue(authorizeState);
  const setSidebar = useSetRecoilState(sidebarState);

  const onClose = useCallback(() => {
    setSidebar(false);
  }, [setSidebar]);

  return (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={onClose}
      onKeyDown={onClose}
    >
      <CommonMenuListComponent />
      {uid > 0 ? <UserMenuListComponent /> : <VisitorMenuListComponent />}
      {role.is_admin && <AdminMenuListComponent />}
      {uid > 0 && <UserButtonMenuListComponent />}
    </Box>
  );
};
