import { Box } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

export const AppLayoutComponent: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      component="div"
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '10px 0',
      }}
    >
      {children}
    </Box>
  );
};
