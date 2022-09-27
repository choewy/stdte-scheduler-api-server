import { FC } from 'react';
import { InputProps } from './interfaces';

export const Input: FC<InputProps> = (props) => {
  return <input {...props} />;
};
