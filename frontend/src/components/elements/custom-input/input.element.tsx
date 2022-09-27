import { FC } from 'react';
import { InputAttributeProps } from './interfaces';

export const CustomInput: FC<InputAttributeProps> = (props) => {
  return <input {...props} />;
};
