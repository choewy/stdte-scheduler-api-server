import { FC } from 'react';
import { List } from '@mui/material';
import { GlobaNavigationItem } from './gsb.interface';
import { GlobaSidebarListItem } from './gsb.list.item';

interface Props {
  open: boolean;
  items: GlobaNavigationItem[];
}

export const AppGlobalNavigationList: FC<Props> = ({ open, items }) => {
  return (
    <List>
      {items.map(({ key, ...item }) => (
        <GlobaSidebarListItem key={key} open={open} item={item} />
      ))}
    </List>
  );
};
