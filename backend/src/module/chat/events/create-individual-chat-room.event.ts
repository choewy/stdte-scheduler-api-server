import { ChatRoom, User } from '@/core/typeorm/entities';
import { NotFoundUserException } from '../chat.exception';
import { ChatRepository } from '../chat.repository';
import { CreateIndividualChatRoomDto } from '../dto';

export const createIndividualChatRoomEvent = async (
  repository: ChatRepository,
  host: User,
  body: CreateIndividualChatRoomDto,
): Promise<number> => {
  const user = await repository.findUserByUserId(body.userId);

  if (!user) {
    throw NotFoundUserException;
  }

  const chatRoom = new ChatRoom();
  chatRoom.host = host;
  chatRoom.name = '';

  const { id } = await repository.saveChatRoom(chatRoom);

  return id;
};
