import { socketConnection } from '@/utils/socket/socket';
import { SocketEmitEvent, SocketOnEvent } from '../enums';
import { SocketEventListener } from '../interfaces';
import { EmitInitUserData } from './interfaces copy';

export const onSubcribeNoticeEvent = (listener: SocketEventListener) => {
  const event = SocketOnEvent.Notice;
  const socket = socketConnection();

  socket.on(event, listener);

  return () => {
    socket.off(event);
  };
};

export const emitUserSignEvent = (user: EmitInitUserData) => {
  const event = SocketEmitEvent.Sign;
  const socket = socketConnection();

  socket.emit(event, user);
};

export const emitUserSignOutEvent = () => {
  const event = SocketEmitEvent.SignOut;
  const socket = socketConnection();

  socket.emit(event);
};
