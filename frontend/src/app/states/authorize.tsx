import { atom } from 'recoil';
import { initAuthorizeState } from './init';
import { AuthorizeStateType } from './types';

export const authorizeState = atom<AuthorizeStateType>({
  key: 'authorizeState',
  default: initAuthorizeState,
});
