import { atom } from 'recoil';

export class ErrorState {
  message: string = '';
}

export const errorState = atom<ErrorState>({
  key: 'error',
  default: new ErrorState(),
});
