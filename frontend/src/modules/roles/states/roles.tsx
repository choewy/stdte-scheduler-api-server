import { atom } from 'recoil';
import { RoleType } from '../constants';

export const rolesState = atom<RoleType[]>({
  key: 'roles',
  default: [],
});
