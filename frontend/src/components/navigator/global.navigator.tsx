import { FC, useEffect, useState } from 'react';
import { ROUTER } from '@/configs';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { authenticateState } from '@/app/authenticate';

export const GlobalNavigator: FC = () => {
  const state = useRecoilValue(authenticateState);
  const [links, setLinks] = useState<Array<{ to: string; label: string }>>([]);

  useEffect(() => {
    const links = [{ to: ROUTER.home, label: '홈' }];

    if (state.login === false) {
      links.push({ to: ROUTER.signin, label: '로그인' });
      links.push({ to: ROUTER.signup, label: '회원가입' });
    }

    if (state.login === true) {
      links.push({ to: ROUTER.users, label: '사용자' });
      links.push({ to: ROUTER.signout, label: '로그아웃' });
    }

    setLinks(links);
  }, [state]);

  return (
    <div>
      {links.map((link) => (
        <Link key={JSON.stringify(link)} to={link.to}>
          {link.label}
        </Link>
      ))}
    </div>
  );
};
