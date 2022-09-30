import {
  MoveToInbox as MoveToInboxIcon,
  Mail as MailIcon,
} from '@mui/icons-material';
import { GlobalNavigatinItems } from './interface';

export const globalNavigationListItems: GlobalNavigatinItems[] = [
  {
    key: 'global-navigation-list-item-groups-top',
    items: [
      {
        key: 'global-navigation-list-item-top-1',
        to: '#',
        label: 'Item 1',
        IconComponent: <MoveToInboxIcon />,
      },
      {
        key: 'global-navigation-list-item-top-2',
        to: '#',
        label: 'Item 2',
        IconComponent: <MoveToInboxIcon />,
      },
      {
        key: 'global-navigation-list-item-top-3',
        to: '#',
        label: 'Item 3',
        IconComponent: <MoveToInboxIcon />,
      },
      {
        key: 'global-navigation-list-item-top-4',
        to: '#',
        label: 'Item 4',
        IconComponent: <MoveToInboxIcon />,
      },
    ],
  },
  {
    key: 'global-navigation-list-item-groups-bottom',
    items: [
      {
        key: 'global-navigation-list-item-bottom-1',
        to: '#',
        label: 'Item 1',
        IconComponent: <MailIcon />,
      },
      {
        key: 'global-navigation-list-item-bottom-2',
        to: '#',
        label: 'Item 2',
        IconComponent: <MailIcon />,
      },
      {
        key: 'global-navigation-list-item-bottom-3',
        to: '#',
        label: 'Item 3',
        IconComponent: <MailIcon />,
      },
      {
        key: 'global-navigation-list-item-bottom-4',
        to: '#',
        label: 'Item 4',
        IconComponent: <MailIcon />,
      },
    ],
  },
];
