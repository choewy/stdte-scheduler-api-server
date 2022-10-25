import { atom } from 'recoil';
import { UserType } from './types';

export const userState = atom<UserType>({
  key: 'userState',
  default: {
    uid: -1,
    name: '',
    email: '',
  },
});
