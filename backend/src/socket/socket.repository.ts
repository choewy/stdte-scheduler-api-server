import { IRepositoryManager } from '@/core/typeorm/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AppSocketRepository extends IRepositoryManager {
  async deleteUserSocket(userId: number, socketId: string): Promise<void> {
    await this.socket.repository.softDelete({ userId, socketId });
  }
}
