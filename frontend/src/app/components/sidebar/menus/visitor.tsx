import { Fragment } from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  AccountCircle as SignInIcon,
  AddCircle as SignUpIcon,
} from '@mui/icons-material';
import { RoutePath } from '@/app/enums';
import { SidebarMenuType } from '../types';
import { useMenuClickCallback } from './callbacks';

const rows: SidebarMenuType[] = [
  {
    text: '로그인',
    path: RoutePath.SignIn,
    icon: <SignInIcon />,
  },
  {
    text: '회원가입',
    path: RoutePath.SignUp,
    icon: <SignUpIcon />,
  },
];

export const VisitorMenuListComponent = () => {
  return (
    <Fragment>
      <Divider />
      <List>
        {rows.map((row) => {
          return (
            <ListItem key={JSON.stringify(row)} disablePadding>
              <ListItemButton onClick={useMenuClickCallback(row)}>
                <ListItemIcon>{row.icon}</ListItemIcon>
                <ListItemText primary={row.text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Fragment>
  );
};
