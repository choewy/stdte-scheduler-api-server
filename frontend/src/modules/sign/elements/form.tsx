import { Paper } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

export const SignFormElement: FC<PropsWithChildren & any> = ({
  children,
  ...props
}) => {
  return (
    <Paper
      elevation={6}
      component="form"
      sx={{
        width: '385px',
        marginTop: '50px',
        padding: '40px',
        boxSizing: 'border-box',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
      {...props}
    >
      {children}
    </Paper>
  );
};
