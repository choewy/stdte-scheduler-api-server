import { atom } from 'recoil';

export class AlertState {
  type?: 'error' | 'success' | 'info' = undefined;
  message: string = '';
  open: boolean = false;
}

export const alertState = atom<AlertState>({
  key: 'alert',
  default: new AlertState(),
});
