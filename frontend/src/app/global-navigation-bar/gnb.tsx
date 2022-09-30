import { FC } from 'react';
import { Menu as MenuIcon } from '@mui/icons-material';
import { Box, IconButton, Toolbar } from '@mui/material';
import { useRecoilState, useRecoilValue } from 'recoil';
import { authenticateState } from '@/app/authenticate';
import { AppBarPublicButton } from './gnb.public.button';
import { AppBarPrivateMenu } from './gnb.private.menu';
import { CustomAppBarStyledComponent } from './gnb.styled.component';
import { appState } from '../app.state';

export const AppGlobalNavigationBar: FC = () => {
  const state = useRecoilValue(authenticateState);
  const [{ open }, setState] = useRecoilState(appState);

  const onSidebarOpen = () => {
    setState((prev) => ({ ...prev, open: true }));
  };

  return (
    <Box sx={{ flexGrow: 1, margin: '0 0 20px' }}>
      <CustomAppBarStyledComponent position="fixed" open={open}>
        <Toolbar>
          <IconButton
            onClick={onSidebarOpen}
            color="inherit"
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
          <Box component="div" sx={{ flexGrow: 1 }} />
          {state.login ? <AppBarPrivateMenu /> : <AppBarPublicButton />}
        </Toolbar>
      </CustomAppBarStyledComponent>
    </Box>
  );
};
