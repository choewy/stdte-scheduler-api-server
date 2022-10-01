import { IconButton, Divider, useTheme } from '@mui/material';
import { FC, Fragment, useCallback } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { appState } from '../app.state';
import { AppGlobalNavigationList } from './gsb.list';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
} from '@mui/icons-material';
import { CustomDrawer, CutomDrawerHeader } from './gsb.styled.component';
import { globalNavigationListItems } from './constants';
import { authenticateState } from '../authenticate';

export const AppGlobalSideBar: FC = () => {
  const theme = useTheme();

  const user = useRecoilValue(authenticateState);
  const [state, setState] = useRecoilState(appState);

  const onCloseSidebar = useCallback(() => {
    setState((prev) => ({ ...prev, open: false }));
  }, [setState]);

  return (
    <CustomDrawer variant="permanent" open={state.open}>
      <CutomDrawerHeader>
        <IconButton onClick={onCloseSidebar}>
          {theme.direction === 'rtl' ? (
            <ChevronRightIcon />
          ) : (
            <ChevronLeftIcon />
          )}
        </IconButton>
      </CutomDrawerHeader>
      {globalNavigationListItems.map(({ key, items }) => (
        <Fragment key={key}>
          <Divider />
          <AppGlobalNavigationList
            user={user}
            open={state.open}
            items={items}
          />
        </Fragment>
      ))}
    </CustomDrawer>
  );
};
