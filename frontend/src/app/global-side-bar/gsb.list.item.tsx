import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobaNavigationItem } from './gsb.interface';

interface Props {
  open: boolean;
  item: Partial<GlobaNavigationItem> & { to: string };
}

export const GlobaSidebarListItem: FC<Props> = ({
  open,
  item: { label, IconComponent, to },
}) => {
  const navigate = useNavigate();
  const onItemClick = useCallback(() => {
    navigate(to, { replace: true });
  }, [navigate]);

  return (
    <ListItem disablePadding sx={{ display: 'block' }}>
      <ListItemButton
        sx={{
          minHeight: 48,
          justifyContent: open ? 'initial' : 'center',
          px: 2.5,
        }}
        onClick={onItemClick}
      >
        <ListItemIcon
          sx={{
            minWidth: 0,
            mr: open ? 3 : 'auto',
            justifyContent: 'center',
          }}
        >
          {IconComponent}
        </ListItemIcon>
        <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
};
