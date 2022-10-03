import { JwtAuthService } from '@/core/jwt-auth';
import { Module } from '@nestjs/common';
import { ChatController } from './chat.controller';
import { ChatGateway } from './chat.gateway';
import { ChatRepository } from './chat.repository';

@Module({
  providers: [JwtAuthService, ChatRepository, ChatGateway],
  controllers: [ChatController],
})
export class ChatRoomModule {}
