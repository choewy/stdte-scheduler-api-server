import { FC } from 'react';
import { Grow, GrowProps } from '@mui/material';

export const GrowTransition: FC<GrowProps> = (props) => {
  return <Grow {...props} />;
};
