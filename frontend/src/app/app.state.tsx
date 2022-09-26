import { atom } from 'recoil';
import { AppState } from './app.state.class';

export const appState = atom<AppState>({
  key: 'app',
  default: new AppState(),
});
