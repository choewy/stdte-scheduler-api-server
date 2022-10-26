import { atom } from 'recoil';
import { TeamsStateType } from './types';

export const teamsState = atom<TeamsStateType>({
  key: 'teamsState',
  default: {
    load: true,
    rows: [],
  },
});
