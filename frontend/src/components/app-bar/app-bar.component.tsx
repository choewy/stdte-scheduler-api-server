import { FC, MouseEvent, useState } from 'react';
import {
  AccountCircle as AccountIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ROUTER } from '@/configs';

export const AppBarComponent: FC = () => {
  const navigate = useNavigate();

  const [auth] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const onMenuClick = (e: MouseEvent<HTMLElement>) => {
    setAnchorEl(e.currentTarget);
  };

  const onMenuClose = () => {
    setAnchorEl(null);
  };

  const onSignInClick = () => {
    return navigate(ROUTER.signin, { replace: true });
  };

  const onSignUpClick = () => {
    return navigate(ROUTER.signup, { replace: true });
  };

  return (
    <Box sx={{ flexGrow: 1, margin: '0 0 20px' }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => alert('아직 구현 안 함')}
          >
            <MenuIcon />
          </IconButton>
          <Box component="div" sx={{ flexGrow: 1 }} />
          {auth ? (
            <div>
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
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={Boolean(anchorEl)}
                onClose={onMenuClose}
              >
                <MenuItem onClick={onMenuClose}>내 정보</MenuItem>
                <MenuItem onClick={onMenuClose}>계정 관리</MenuItem>
              </Menu>
            </div>
          ) : (
            <>
              <Button color="inherit" onClick={onSignInClick}>
                로그인
              </Button>
              <Button color="inherit" onClick={onSignUpClick}>
                회원가입
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  );
};
