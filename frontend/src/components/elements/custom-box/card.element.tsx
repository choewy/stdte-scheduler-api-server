import {
  Box,
  Card,
  CardContent,
  CardContentProps,
  CardProps,
} from '@mui/material';
import { FC } from 'react';

export const CustomCardBox: FC<CardProps & CardContentProps> = ({
  children,
  sx,
  ...props
}) => {
  return (
    <Box
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Card sx={sx}>
        <CardContent {...props} style={{ padding: 50 }}>
          {children}
        </CardContent>
      </Card>
    </Box>
  );
};
