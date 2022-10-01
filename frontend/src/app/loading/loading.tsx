import { Backdrop, CircularProgress } from '@mui/material';
import { FC } from 'react';

export const AppLoading: FC = () => {
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={true}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
