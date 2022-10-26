import { RoutePath } from '@/app/enums';
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import {
  Group as TeamIcon,
  Assignment as TaskIcon,
  History as HistoryIcon,
} from '@mui/icons-material';
import { Fragment } from 'react';
import { SidebarMenuType } from '../types';
import { useMenuClickCallback } from './callbacks';

const rows: SidebarMenuType[] = [
  {
    text: '팀 정보',
    path: RoutePath.MyTeams,
    icon: <TeamIcon />,
  },
  {
    text: '업무 목록',
    path: RoutePath.Tasks,
    icon: <TaskIcon />,
  },
  {
    text: '시간 관리',
    path: RoutePath.History,
    icon: <HistoryIcon />,
  },
];

export const UserMenuListComponent = () => {
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
