import { atom } from 'recoil';
import { SocketInstance } from '@/utils';

export const connectionState = atom({
  key: 'connectionState',
  default: new SocketInstance(),
});
