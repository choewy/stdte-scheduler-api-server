import { atom } from 'recoil';
import { RoleType } from './types';

export const rolesState = atom<RoleType[]>({
  key: 'roles',
  default: [],
});
