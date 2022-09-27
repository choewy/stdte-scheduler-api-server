import { atom } from 'recoil';

export class AppState {}

export const appState = atom<AppState>({
  key: 'app',
  default: new AppState(),
});
