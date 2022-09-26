import { atom } from 'recoil';
import { AuthApi } from './auth';

export class ApiState {
  authApi = new AuthApi();
}

export const apiState = atom<ApiState>({
  key: 'api',
  default: new ApiState(),
});
