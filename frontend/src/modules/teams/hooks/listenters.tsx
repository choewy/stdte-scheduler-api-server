import { SetterOrUpdater } from 'recoil';
import { TeamsStateType, TeamType } from '../states';

export const useTeamCreateSyncListener =
  (setTeams: SetterOrUpdater<TeamsStateType>) => (row: TeamType) => {
    setTeams((prev) => ({
      load: false,
      rows: [...prev.rows, row],
    }));
  };

export const useTeamUpdateSyncListener =
  (setTeams: SetterOrUpdater<TeamsStateType>) => (row: TeamType) => {
    setTeams((prev) => {
      return {
        load: false,
        rows: prev.rows.map((prevRow) =>
          prevRow.tid === row.tid ? row : prevRow,
        ),
      };
    });
  };

export const useTeamDeleteSyncLisetner =
  (setTeams: SetterOrUpdater<TeamsStateType>) => (tid: number) => {
    setTeams((prev) => {
      return {
        load: false,
        rows: prev.rows.filter((prevRow) => prevRow.tid !== tid),
      };
    });
  };
