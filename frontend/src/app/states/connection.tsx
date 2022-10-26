import { SocketInstance } from '@/utils';
import { atom } from 'recoil';

export const connectionState = atom<SocketInstance>({
  key: 'connectionState',
  default: new SocketInstance(),
});
