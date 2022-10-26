import { SetterOrUpdater } from 'recoil';
import { TeamType } from '../states';

export const useTeamCreateSyncListener =
  (setTeams: SetterOrUpdater<TeamType[]>) => (row: TeamType) => {
    setTeams((prev) => [...prev, row]);
  };

export const useTeamUpdateSyncListener =
  (setTeams: SetterOrUpdater<TeamType[]>) => (row: TeamType) => {
    setTeams((prev) => {
      return prev.map((prev) => (prev.tid === row.tid ? row : prev));
    });
  };

export const useTeamDeleteSyncLisetner =
  (setTeams: SetterOrUpdater<TeamType[]>) => (tid: number) => {
    setTeams((prev) => {
      return prev.filter((prev) => prev.tid !== tid);
    });
  };
