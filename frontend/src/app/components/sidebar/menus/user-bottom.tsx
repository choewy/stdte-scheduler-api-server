import { RoutePath } from '@/app/enums';
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { Logout as SignOutIcon } from '@mui/icons-material';
import { Fragment } from 'react';
import { SidebarMenuType } from '../types';
import { useMenuClickCallback } from './callbacks';

const rows: SidebarMenuType[] = [
  {
    text: '로그아웃',
    path: RoutePath.SignOut,
    icon: <SignOutIcon />,
  },
];

export const UserButtonMenuListComponent = () => {
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
