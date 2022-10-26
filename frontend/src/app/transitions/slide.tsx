import { FC } from 'react';
import { Slide, SlideProps } from '@mui/material';

export const SlideTransition: FC<SlideProps> = (props) => {
  return <Slide {...props} direction="up" />;
};
