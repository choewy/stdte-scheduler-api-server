import { ROUTER } from '@/configs';
import { AccountCircle as AccountIcon } from '@mui/icons-material';
import { IconButton, Menu, MenuItem } from '@mui/material';
import { MouseEvent, useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const AppBarPrivateMenu = () => {
  const navigate = useNavigate();
  const [anchor, setAnchor] = useState<null | HTMLElement>(null);

  const onMenuClick = useCallback(
    (e: MouseEvent<HTMLElement>) => {
      setAnchor(e.currentTarget);
    },
    [setAnchor],
  );

  const onMenuClose = useCallback(() => {
    setAnchor(null);
  }, [setAnchor]);

  const onProfileClick = useCallback(() => {
    navigate(ROUTER.profile, { replace: true });
  }, [navigate]);

  const onSignOutClick = useCallback(() => {
    navigate(ROUTER.signout, { replace: true });
  }, [navigate]);

  return (
    <>
      <IconButton
        size="large"
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={onMenuClick}
        color="inherit"
      >
        <AccountIcon />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchor}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchor)}
        onClose={onMenuClose}
      >
        <MenuItem onClick={onProfileClick}>프로필</MenuItem>
        <MenuItem onClick={onSignOutClick}>로그아웃</MenuItem>
      </Menu>
    </>
  );
};
