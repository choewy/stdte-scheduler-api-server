import { ChatRoom, User } from '@/core/typeorm/entities';
import { NotFoundUserException } from '../chat.exception';
import { ChatRepository } from '../chat.repository';
import { CreateGroupChatRoomDto } from '../dto';

export const createGroupChatRoomEvent = async (
  repository: ChatRepository,
  host: User,
  { userIds, name }: CreateGroupChatRoomDto,
): Promise<number> => {
  const users = await repository.findUsersByUserId(userIds);

  if (userIds.length !== users.length) {
    throw NotFoundUserException;
  }

  const chatRoom = new ChatRoom();
  chatRoom.host = host;
  chatRoom.name = name;

  if (!name) {
    const length = users.length;

    let name: string;

    if (length > 3) {
      name =
        users
          .slice(0, 3)
          .map((user) => user.nickname)
          .join(', ') + ` 외 ${length - 3}명`;
    } else {
      name = users.map((user) => user.nickname).join(', ');
    }

    chatRoom.name = name;
  }

  const { id } = await repository.saveChatRoom(chatRoom);

  return id;
};
