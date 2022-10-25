import { atom } from 'recoil';

export const authorizeState = atom({
  key: 'authorizeState',
  default: {
    uid: -1,
    name: '',
    email: '',
  },
});
