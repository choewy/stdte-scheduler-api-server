import { RoutePath } from '@/app/enums';
import { ReactElement } from 'react';

export type SidebarMenuKey = 'visitor' | 'user' | 'admin';

export type SidebarMenuType = {
  text: string;
  icon: ReactElement;
  path?: RoutePath;
  href?: string;
};

export type SidebarMenuRecordType = Record<
  SidebarMenuKey,
  Array<SidebarMenuType>
>;
