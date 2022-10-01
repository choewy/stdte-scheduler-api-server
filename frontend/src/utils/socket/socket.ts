import { SOCKET_CONFIG } from '@/configs';
import { io, Socket } from 'socket.io-client';

export const socket: Socket = io(SOCKET_CONFIG.uri, {
  transports: ['websocket'],
});

export const socketConnection = (): Socket => {
  if (socket.disconnected) {
    socket.connect();
  }

  return socket;
};

export const disConnectSocker = () => {
  if (socket.connected) {
    socket.disconnect();
  }
};
