import { AlertState } from '@/components';
import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { Resetter, SetterOrUpdater } from 'recoil';

export interface DefaultApiProps<T = any> {
  setAlert: SetterOrUpdater<AlertState>;
  navigate?: NavigateFunction;
  setState?: SetterOrUpdater<T> | Dispatch<SetStateAction<T>>;
  resetState?: Resetter;
}
