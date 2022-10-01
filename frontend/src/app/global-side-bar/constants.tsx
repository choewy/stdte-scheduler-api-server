import { ROUTER } from '@/configs';
import { RoleType } from '@/apis';
import {
  Home as HomeIcon,
  Mail as MailIcon,
  Group as UserGroupIcon,
  GitHub as GitHubIcon,
} from '@mui/icons-material';
import { GlobalNavigatinItems } from './interface';

export const globalNavigationListItems: GlobalNavigatinItems[] = [
  {
    key: 'global-navigation-list-item-groups-top',
    items: [
      {
        to: ROUTER.home,
        label: '홈',
        IconComponent: <HomeIcon />,
      },
      {
        to: 'https://github.com/choewy',
        blank: true,
        label: 'GitHub',
        IconComponent: <GitHubIcon />,
      },
    ],
  },
  {
    key: 'global-navigation-list-item-groups-bottom',
    items: [
      {
        to: ROUTER.users,
        label: '사용자 계정 목록',
        IconComponent: <UserGroupIcon />,
        login: true,
        roles: [RoleType.Master, RoleType.Admin],
      },
      {
        to: '#',
        label: 'Item 2',
        login: true,
        IconComponent: <MailIcon />,
      },
      {
        to: '#',
        label: 'Item 3',
        login: true,
        IconComponent: <MailIcon />,
      },
      {
        to: '#',
        label: 'Item 4',
        login: true,
        IconComponent: <MailIcon />,
      },
    ],
  },
];
