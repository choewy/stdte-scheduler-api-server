import { sidebarState } from '@/app/states';
import { SwipeableDrawer } from '@mui/material';
import { useCallback } from 'react';
import { useRecoilState } from 'recoil';
import { SidebarListComponent } from './sidebar-list';

export const AppSidebarComponent = () => {
  const [sidebar, setSideber] = useRecoilState(sidebarState);

  const onOpen = useCallback(() => {
    setSideber(true);
  }, [setSideber]);

  const onClose = useCallback(() => {
    setSideber(false);
  }, [setSideber]);

  return (
    <SwipeableDrawer
      anchor="left"
      open={sidebar}
      onOpen={onOpen}
      onClose={onClose}
    >
      <SidebarListComponent />
    </SwipeableDrawer>
  );
};
