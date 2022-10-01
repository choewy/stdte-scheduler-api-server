import { FC } from 'react';
import { List } from '@mui/material';
import { GlobaNavigationItem } from './interface';
import { GlobaSidebarListItem } from './gsb.list.item';
import { AuthenticateState } from '../authenticate';

interface Props {
  open: boolean;
  user: AuthenticateState;
  items: GlobaNavigationItem[];
}

export const AppGlobalNavigationList: FC<Props> = ({ user, open, items }) => {
  return (
    <List>
      {items
        .filter((item) => {
          let correct = true;

          if (typeof item.login === 'boolean') {
            correct = item.login === user.login;
          }

          if (Array.isArray(item.roles)) {
            const roles = user.roles.map((role) => role.type);
            for (const role of roles) {
              correct = item.roles.includes(role);
              if (correct) {
                break;
              }
            }
          }

          return correct;
        })
        .map((item, i) => (
          <GlobaSidebarListItem
            key={JSON.stringify(item) + i}
            open={open}
            item={item}
          />
        ))}
    </List>
  );
};
