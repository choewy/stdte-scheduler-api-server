import { Button } from '@mui/material';
import { FC } from 'react';

interface Props {
  text: string;
}

export const SignButtonElement: FC<Props> = ({ text }) => {
  return (
    <Button
      type="submit"
      variant="contained"
      sx={{
        width: '100%',
        margin: '20px 0 10px',
      }}
    >
      {text}
    </Button>
  );
};
