import { ChangeEventHandler, useCallback } from 'react';
import { SetterOrUpdater } from 'recoil';

interface InputChangeEvent {
  <T>(setState: SetterOrUpdater<T>): ChangeEventHandler<HTMLInputElement>;
}

export const useInputChangeEvent: InputChangeEvent = (setState) => {
  return useCallback(
    (e) => {
      const { name, value } = e.target;
      setState((prev: any) => {
        const required = prev[name].required;
        const helperText =
          required && value === '' && `${prev[name].label}을 입력하세요.`;
        return {
          ...prev,
          [name]: {
            ...prev[name],
            value,
            helperText,
            error: !!helperText,
          },
        };
      });
    },
    [setState],
  );
};
