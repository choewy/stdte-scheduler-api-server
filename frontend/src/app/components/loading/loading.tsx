import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { Backdrop, CircularProgress } from '@mui/material';
import { loadingState } from '@/app/states';

type Props = {
  load?: boolean;
};

export const AppLoadingComponent: FC<Props> = ({ load }) => {
  const loading = useRecoilValue(loadingState);

  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
      open={Boolean(loading || load)}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};
