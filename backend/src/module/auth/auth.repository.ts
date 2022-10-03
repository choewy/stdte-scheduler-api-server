import {
  IRepositoryManager,
  Role,
  RoleType,
  Socket,
  Team,
  TeamStatus,
  User,
} from '@/core/typeorm/entities';
import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthRepository extends IRepositoryManager {
  async findUser(params: Partial<User>): Promise<User> {
    return await this.user.selectAllRelationQuery(params).getOne();
  }

  async findRoles(types: RoleType[]): Promise<Role[]> {
    return await this.role.selectIncludeRoleTypeQuery(types).getMany();
  }

  async findTeams(status: TeamStatus[]): Promise<Team[]> {
    return await this.team.selectIncludeStatusQuery(status).getMany();
  }

  async saveUser(user: Partial<User>): Promise<User> {
    return await this.user.repository.save(user);
  }

  async findUserSocket(userId: number): Promise<Socket> {
    return await this.socket.queryBuilder
      .select()
      .where('socket.userId = :userId', { userId })
      .withDeleted()
      .getOne();
  }

  async insertSocket(userId: number, socketId: string): Promise<void> {
    const socket = new Socket();
    socket.userId = userId;
    socket.socketId = socketId;
    await this.socket.repository.insert(socket);
  }

  async updateUserSocket(
    userId: number,
    socketId: string,
    newSocketId: string,
  ): Promise<void> {
    await this.socket.repository.update(
      { userId, socketId },
      { socketId: newSocketId },
    );
  }

  async deleteUserSockets(userId: number): Promise<void> {
    await this.socket.repository.delete({ userId });
  }
}
