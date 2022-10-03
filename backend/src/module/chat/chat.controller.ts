import { SwaggerController } from '@/core/swagger';
import { User } from '@/core/typeorm/entities';
import { CurrentUser } from '@/server/param';
import { Body } from '@nestjs/common';
import { ChatRepository } from './chat.repository';
import { ChatRouter } from './chat.router';
import { CreateIndividualChatRoomDto, CreateGroupChatRoomDto } from './dto';
import {
  createIndividualChatRoomEvent,
  createGroupChatRoomEvent,
} from './events';

@SwaggerController({ path: 'chats', tag: '채팅' })
export class ChatController {
  constructor(private readonly repository: ChatRepository) {}

  @ChatRouter.CreateIndividualChatRoom({
    method: 'POST',
    path: 'rooms/individual',
  })
  async createIndividualChatRoom(
    @CurrentUser() user: User,
    @Body() body: CreateIndividualChatRoomDto,
  ): Promise<number> {
    return await createIndividualChatRoomEvent(this.repository, user, body);
  }

  @ChatRouter.CreateGroupChatRoom({
    method: 'POST',
    path: 'rooms/group',
  })
  async createGroupChatRoom(
    @CurrentUser() user: User,
    @Body() body: CreateGroupChatRoomDto,
  ): Promise<number> {
    return await createGroupChatRoomEvent(this.repository, user, body);
  }
}
