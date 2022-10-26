import { FC, useCallback, useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { Alert, Snackbar } from '@mui/material';
import { SlideTransition } from '@/app/transitions';
import { exceptionState } from '@/app/states';

export const AppExceptionComponent: FC = () => {
  const [exception, setException] = useRecoilState(exceptionState);
  const [open, setOpen] = useState<boolean>(Boolean(exception));

  const onClose = useCallback(() => {
    setOpen(false);
  }, [setOpen]);

  useEffect(() => {
    if (exception) {
      setOpen(true);
    }
  }, [exception, setOpen]);

  useEffect(() => {
    if (open === false) {
      const timeout = setTimeout(() => {
        setException('');
      }, 1000);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [open, setException]);

  return (
    <Snackbar
      open={open}
      autoHideDuration={5000}
      TransitionComponent={SlideTransition}
      sx={{
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Alert onClose={onClose} severity="error">
        {exception}
      </Alert>
    </Snackbar>
  );
};
