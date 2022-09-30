import { ROUTER } from '@/configs';
import { Button } from '@mui/material';
import { FC, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

export const AppBarPublicButton: FC = () => {
  const navigate = useNavigate();

  const onSignInClick = useCallback(() => {
    navigate(ROUTER.signin, { replace: true });
  }, [navigate]);

  const onSignUpClick = useCallback(() => {
    navigate(ROUTER.signup, { replace: true });
  }, [navigate]);

  return (
    <>
      <Button color="inherit" onClick={onSignInClick}>
        로그인
      </Button>
      <Button color="inherit" onClick={onSignUpClick}>
        회원가입
      </Button>
    </>
  );
};
