import { socketConnection } from '@/utils/socket';
import { SocketEmitEvent, SocketOnEvent } from '../enums';
import { SocketEventListener } from '../interfaces';

export const emitChatRoomsEvent = () => {
  const event = SocketEmitEvent.MessageRooms;
  const socket = socketConnection();

  return socket.emit(event);
};

export const onSubscribeChatRoomsEvent = (listener: SocketEventListener) => {
  const event = SocketOnEvent.MessageRooms;
  const socket = socketConnection();

  socket.on(event, listener);

  return () => {
    socket.off(event);
  };
};
