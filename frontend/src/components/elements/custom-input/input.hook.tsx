import { ChangeEventHandler, useCallback } from 'react';
import { SetterOrUpdater } from 'recoil';

interface InputChangeEvent {
  <T>(setState: SetterOrUpdater<T>): ChangeEventHandler<HTMLInputElement>;
}

export const useInputChangeEvent: InputChangeEvent = (setState) => {
  return useCallback(
    (e) => {
      const { name, value } = e.target;
      setState((prev: any) => ({
        ...prev,
        [name]: {
          ...prev[name as keyof any],
          value,
        },
      }));
    },
    [setState],
  );
};
