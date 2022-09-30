import { TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';

export const CustomInput: FC<TextFieldProps> = (props) => {
  return <TextField {...props} style={{ margin: '5px 0' }} />;
};
