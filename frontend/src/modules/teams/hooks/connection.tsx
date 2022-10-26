import { useEffect } from 'react';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { connectionState } from '@/app';
import { teamsState } from '../states';
import { TeamEvent } from '../enums';
import {
  useTeamCreateSyncListener,
  useTeamDeleteSyncLisetner,
  useTeamUpdateSyncListener,
} from './listenters';
import { useTeamAllCallback } from './callbacks';

export const useTeamConnection = () => {
  const connection = useRecoilValue(connectionState);
  const setTeams = useSetRecoilState(teamsState);

  useEffect(() => {
    connection.on(TeamEvent.OnCreateSync, useTeamCreateSyncListener(setTeams));
    connection.on(TeamEvent.OnUpdateSync, useTeamUpdateSyncListener(setTeams));
    connection.on(TeamEvent.OnDeleteSync, useTeamDeleteSyncLisetner(setTeams));
    connection.emit(TeamEvent.EmitAll, useTeamAllCallback(setTeams));

    return connection.clean();
  }, [connection, setTeams]);

  return connection;
};
