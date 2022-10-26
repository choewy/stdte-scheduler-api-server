import { RoutePath } from '@/app';
import { Dispatch, SetStateAction } from 'react';
import { NavigateFunction } from 'react-router-dom';
import { SetterOrUpdater } from 'recoil';
import { TeamType, TeamUserType } from '../states';

export const useTeamAllCallback =
  (setTeams: SetterOrUpdater<TeamType[]>) => async (rows: TeamType[]) => {
    setTeams(rows);
  };

export const useTeamDeleteCallback =
  (navigate: NavigateFunction) => async () => {
    navigate(RoutePath.Teams, { replace: true });
  };

export const useTeamSearchUserCallback =
  (setUsers: Dispatch<SetStateAction<TeamUserType[]>>) =>
  async (rows: TeamUserType[]) => {
    setUsers(rows);
  };

export const useTeamMemberAppendCallback =
  (
    uid: number,
    users: TeamUserType[],
    setUsers: Dispatch<SetStateAction<TeamUserType[]>>,
  ) =>
  async () => {
    setUsers(users.filter((user) => user.uid !== uid));
  };
