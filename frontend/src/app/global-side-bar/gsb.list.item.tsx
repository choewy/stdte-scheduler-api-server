import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Tooltip,
} from '@mui/material';
import { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlobaNavigationItem } from './interface';

interface Props {
  open: boolean;
  item: Partial<GlobaNavigationItem> & { to: string };
}

export const GlobaSidebarListItem: FC<Props> = ({
  open,
  item: { blank, label, IconComponent, to },
}) => {
  const navigate = useNavigate();
  const onItemClick = () => {
    if (blank) {
      return window.open(to);
    }

    navigate(to, { replace: true });
  };

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
        <Tooltip title={label as string}>
          <ListItemIcon
            sx={{
              minWidth: 0,
              mr: open ? 3 : 'auto',
              justifyContent: 'center',
            }}
          >
            {IconComponent}
          </ListItemIcon>
        </Tooltip>
        <ListItemText primary={label} sx={{ opacity: open ? 1 : 0 }} />
      </ListItemButton>
    </ListItem>
  );
};
