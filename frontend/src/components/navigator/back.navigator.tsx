import { FC, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const BackNavigator: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    navigate(-1);
  }, []);

  return <></>;
};
