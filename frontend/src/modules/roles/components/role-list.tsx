import { RoutePath } from '@/app';
import { List, ListItem, ListItemButton } from '@mui/material';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { rolesState, RoleType } from '../states';

export const RoleListComponent: FC = () => {
  const navigate = useNavigate();
  const { rows } = useRecoilValue(rolesState);

  const onClick = useCallback(
    (row: RoleType) => () => {
      navigate(`${RoutePath.Roles}/${row.rid}`);
    },
    [navigate],
  );

  return (
    <List>
      {rows.map((row) => {
        return (
          <ListItem key={JSON.stringify(row)}>
            <ListItemButton onClick={onClick(row)}>
              {row.name}({row.members.length})
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
