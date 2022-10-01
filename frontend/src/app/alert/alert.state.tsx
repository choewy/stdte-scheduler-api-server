import { atom } from 'recoil';

export class AlertState {
  type?: 'error' | 'success' | 'info' = 'info';
  open?: boolean = false;
  duration?: number = 3000;
  message: string = '';
}

export const alertState = atom<AlertState>({
  key: 'alert',
  default: new AlertState(),
});
