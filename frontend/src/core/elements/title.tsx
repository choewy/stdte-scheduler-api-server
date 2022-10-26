import { Typography, TypographyProps } from '@mui/material';
import { FC } from 'react';

interface Props {
  title: string;
}

export const TitleElement: FC<Props & TypographyProps> = ({
  title,
  ...props
}) => {
  return (
    <Typography
      variant="h5"
      color="GrayText"
      sx={{
        fontSize: '24px',
        margin: '10px 0 20px',
      }}
      {...props}
    >
      {title}
    </Typography>
  );
};
