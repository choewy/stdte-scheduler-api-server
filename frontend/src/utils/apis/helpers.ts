import { AlertState } from '@/components';
import { AxiosError } from 'axios';
import { SetterOrUpdater } from 'recoil';

export const apiExceptionHandler = (
  e: unknown,
  setAlert: SetterOrUpdater<AlertState>,
) => {
  const error = e as AxiosError;
  const { data } = error.response as any;

  const alert: AlertState = {
    type: 'error',
    message: 'Internal Server Error',
    open: true,
  };

  if (data?.message) {
    alert.message = data.message;
  }

  setAlert(alert);
};
