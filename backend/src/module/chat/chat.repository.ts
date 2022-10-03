import { IRepositoryManager, User } from '@/core/typeorm/entities';
import { ChatRoom } from '@/core/typeorm/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ChatRepository extends IRepositoryManager {
  async findUserByUserId(userId: number): Promise<User> {
    return await this.user.selectByInIdsQuery([userId]).getOne();
  }

  async findUsersByUserId(userIds: number[]): Promise<User[]> {
    return await this.user.selectByInIdsQuery(userIds).getMany();
  }

  async findChatRoomsByUserId(userId: number): Promise<ChatRoom[]> {
    return await this.chatRoom.queryBuilder
      .select()
      .innerJoinAndSelect('chatRoom.host', 'host')
      .innerJoinAndSelect('chatRoom.chatMessages', 'messages')
      .innerJoinAndSelect('messages.sender', 'sender')
      .innerJoinAndSelect('messages.receiver', 'receiver')
      .where('host.id = :userId', { userId })
      .orWhere('sender.id = :userId', { userId })
      .orWhere('receiver.id = :userId', { userId })
      .getMany();
  }

  async saveChatRoom(chatRoom: Partial<ChatRoom>): Promise<ChatRoom> {
    return await this.chatRoom.repository.save(chatRoom);
  }
}
