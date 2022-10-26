import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { RoutePath } from '@/app';
import { initRoleState } from './init';
import { rolesState } from './roles';
import { RoleParamType, RoleType } from './types';

export const useRoleState = (): [
  RoleType,
  Dispatch<SetStateAction<RoleType>>,
] => {
  const navigate = useNavigate();
  const params = useParams<RoleParamType>();
  const rows = useRecoilValue(rolesState);

  const [row, setRow] = useState<RoleType>(initRoleState);

  useEffect(() => {
    const id = parseInt(params.rid as string, 10);

    if (id && !isNaN(id)) {
      const row = rows.find((row) => row.rid === id) as RoleType;

      if (row) {
        setRow(row);
      }
    } else {
      navigate(RoutePath.Teams, { replace: true });
      return;
    }
  }, [params, navigate, rows, setRow]);

  return [row, setRow];
};
