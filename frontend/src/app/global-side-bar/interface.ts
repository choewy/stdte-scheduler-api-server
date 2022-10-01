import { RoleType } from '@/apis';
import { ReactElement } from 'react';

export interface GlobaNavigationItem {
  to: string;
  label: string;
  IconComponent: ReactElement;
  blank?: boolean;
  login?: boolean;
  roles?: RoleType[];
}

export interface GlobalNavigatinItems {
  key: string;
  items: GlobaNavigationItem[];
}
