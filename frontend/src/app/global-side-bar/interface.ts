import { ReactElement } from 'react';

export interface GlobaNavigationItem {
  key: string;
  to: string;
  label: string;
  IconComponent: ReactElement;
}

export interface GlobalNavigatinItems {
  key: string;
  items: GlobaNavigationItem[];
}
