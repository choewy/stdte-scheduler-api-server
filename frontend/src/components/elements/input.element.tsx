import { FC } from 'react';
import { InputProps } from './interfaces';

export const CustomInput: FC<InputProps> = (props) => {
  return <input {...props} />;
};
