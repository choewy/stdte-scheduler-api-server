import { atom } from 'recoil';
import { RoleStateType } from './types';

export const rolesState = atom<RoleStateType>({
  key: 'rolesState',
  default: {
    load: true,
    rows: [],
  },
});
