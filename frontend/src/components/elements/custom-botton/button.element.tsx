import { Button, ButtonProps } from '@mui/material';
import { FC } from 'react';

export const CustomButtom: FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <Button
      {...props}
      style={{ margin: '10px 0' }}
      variant="contained"
      disableElevation
    >
      {children}
    </Button>
  );
};
