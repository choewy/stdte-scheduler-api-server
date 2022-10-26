import { Box, AppBar, IconButton, Toolbar, Typography } from '@mui/material';
import { Menu as MenuIcon } from '@mui/icons-material';
import { useSetRecoilState } from 'recoil';
import { sidebarState } from '@/app/states';
import { useCallback } from 'react';

export const AppHeaderComponent = () => {
  const setSidebar = useSetRecoilState(sidebarState);

  const onOpen = useCallback(() => {
    setSidebar(true);
  }, [setSidebar]);

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={onOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            SCHEDULER
          </Typography>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
