import { emitChatRoomsEvent, onSubscribeChatRoomsEvent } from '@/events/chat';
import { FC, useEffect, useState } from 'react';

export const ChatRoomListPage: FC = () => {
  const [chatRoom, setChatRooms] = useState<{
    count: number;
    rows: any[];
  }>({ count: 0, rows: [] });

  const getChatRooms = (data: { count: number; rows: any[] }) => {
    console.log(data);
    setChatRooms(data);
  };

  useEffect(() => {
    return onSubscribeChatRoomsEvent(getChatRooms);
  }, []);

  useEffect(() => {
    emitChatRoomsEvent();
  }, []);

  return (
    <div>
      <div>COUNT : {chatRoom.count}</div>
      <div>ROWS : {JSON.stringify(chatRoom.rows)}</div>
    </div>
  );
};
