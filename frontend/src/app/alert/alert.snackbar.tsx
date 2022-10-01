import { FC } from 'react';
import { useRecoilState } from 'recoil';
import { Alert, Snackbar } from '@mui/material';
import { alertState } from './alert.state';

export const AlertSnackbar: FC = () => {
  const [state, setState] = useRecoilState(alertState);

  const onClose = () => {
    setState((prev) => ({ ...prev, open: false }));
  };

  return (
    <Snackbar
      open={state.open}
      onClose={onClose}
      autoHideDuration={3000}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
    >
      <Alert onClose={onClose} severity={state.type}>
        {state.message}
      </Alert>
    </Snackbar>
  );
};
