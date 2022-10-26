import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { RoutePath } from '@/app';
import { TeamParamType, TeamType } from './types';
import { teamsState } from './teams';
import { initTeamState } from './init';

export const useTeamState = (): [
  TeamType,
  Dispatch<SetStateAction<TeamType>>,
] => {
  const navigate = useNavigate();
  const params = useParams<TeamParamType>();

  const { rows } = useRecoilValue(teamsState);
  const [row, setRow] = useState<TeamType>(initTeamState);

  useEffect(() => {
    const id = parseInt(params.tid as string, 10);

    if (id && !isNaN(id)) {
      const row = rows.find((row) => row.tid === id) as TeamType;

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
