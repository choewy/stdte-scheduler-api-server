import { atom } from 'recoil';
import { TeamType } from './types';

export const teamsState = atom<TeamType[]>({
  key: 'teamsState',
  default: [],
});
