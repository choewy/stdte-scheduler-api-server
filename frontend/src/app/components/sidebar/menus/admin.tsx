import { SidebarMenuType } from '../types';
import {
  Policy as RoleIcon,
  Groups as TeamIcon,
  ManageAccounts as AccountIcon,
} from '@mui/icons-material';
import { RoutePath } from '@/app/enums';
import { Fragment } from 'react';
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useMenuClickCallback } from './callbacks';

const rows: SidebarMenuType[] = [
  {
    text: '계정 관리',
    path: RoutePath.Accounts,
    icon: <AccountIcon />,
  },
  {
    text: '역할 관리',
    path: RoutePath.Roles,
    icon: <RoleIcon />,
  },
  {
    text: '팀 관리',
    path: RoutePath.Teams,
    icon: <TeamIcon />,
  },
];

export const AdminMenuListComponent = () => {
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
