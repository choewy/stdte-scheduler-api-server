import { FC } from 'react';
import { ROUTER } from '@/configs';
import { Link } from 'react-router-dom';

export const GlobalNavigator: FC = () => {
  return (
    <div>
      <Link to={ROUTER.home}>홈</Link>
      <Link to={ROUTER.block}>차단</Link>
      <Link to={ROUTER.signin}>로그인</Link>
      <Link to={ROUTER.signup}>회원가입</Link>
      <Link to={ROUTER.signout}>로그아웃</Link>
    </div>
  );
};
