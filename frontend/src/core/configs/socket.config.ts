import { SocketConfig } from './interfaces';

export const socketConfig = (): SocketConfig => ({
  uri: process.env.REACT_APP_SOCKET_URI,
  path: process.env.REACT_APP_SOCKET_PATH,
});
