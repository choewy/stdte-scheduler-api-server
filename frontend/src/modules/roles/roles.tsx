import { FC } from 'react';
import { useRolesConnection } from './hooks';
import { TitleElement } from '@/core';
import { RoleCreateFormElement, RoleListComponent } from './components';
import { Paper } from '@mui/material';

export const RolesPage: FC = () => {
  const connection = useRolesConnection();

  return (
    <Paper
      elevation={6}
      component="div"
      sx={{
        width: '385px',
        marginTop: '50px',
        padding: '40px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <TitleElement title="역할 관리" />
      <RoleListComponent />
      <RoleCreateFormElement connection={connection} />
    </Paper>
  );
};
