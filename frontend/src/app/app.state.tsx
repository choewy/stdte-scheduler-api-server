import { atom } from 'recoil';

export class AppState {
  open: boolean = false;
}

export const appState = atom<AppState>({
  key: 'app',
  default: new AppState(),
});
