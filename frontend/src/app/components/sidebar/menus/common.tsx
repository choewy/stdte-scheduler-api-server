import { RoutePath } from '@/app/enums';
import { SidebarMenuType } from '../types';
import {
  Home as HomeIcon,
  GitHub as GitHubIcon,
  Email as EmailIcon,
} from '@mui/icons-material';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { useMenuClickCallback } from './callbacks';

const rows: SidebarMenuType[] = [
  {
    text: '홈',
    path: RoutePath.Home,
    icon: <HomeIcon />,
  },
  {
    text: 'GitHub',
    href: 'https://github.com/choewy/stdte-task-scheduler',
    icon: <GitHubIcon />,
  },
  {
    text: 'Contact',
    href: 'mailto:choewy32@gmail.com',
    icon: <EmailIcon />,
  },
];

export const CommonMenuListComponent = () => {
  return (
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
  );
};
