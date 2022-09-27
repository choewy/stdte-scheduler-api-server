import { ChangeEvent, useCallback } from 'react';
import { SetterOrUpdater } from 'recoil';

interface InputChangeEvent {
  <T>(setState: SetterOrUpdater<T>): (e: ChangeEvent<HTMLInputElement>) => void;
}

export const useInputChangeEvent: InputChangeEvent = (setState) => {
  return useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
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
