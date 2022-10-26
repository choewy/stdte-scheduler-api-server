import { TextField, TextFieldProps } from '@mui/material';
import { FC } from 'react';

export const SignInputElement: FC<TextFieldProps> = (props) => {
  return (
    <TextField
      {...props}
      autoComplete="off"
      sx={{
        width: '100%',
        margin: '10px 0',
      }}
      inputProps={{
        style: {
          fontSize: '14px',
        },
      }}
    />
  );
};
