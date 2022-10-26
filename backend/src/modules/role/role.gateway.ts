import { WSModuleGateway } from '@/core';
import { RedisService } from '@/core/redis';
import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthGuard } from '../auth';
import {
  CreateRoleDto,
  RoleMemberParamDto,
  RoleParamDto,
  SearchUsersDto,
  UpdateRoleDto,
} from './dto';
import { RoleMessage } from './enums';
import { adminOnly } from './policy';
import { RoleGuard } from './role.guard';
import { RolePolicyMetadata } from './role.metadata';
import { RoleService } from './role.service';

@WSModuleGateway()
export class RoleGateway {
  @WebSocketServer() private readonly server: Server;

  constructor(
    private readonly redisService: RedisService,
    private readonly roleService: RoleService,
  ) {}

  @UseGuards(AuthGuard)
  @SubscribeMessage(RoleMessage.All)
  async getRoles() {
    return await this.roleService.getRoles();
  }

  @RolePolicyMetadata(adminOnly)
  @UseGuards(AuthGuard, RoleGuard)
  @SubscribeMessage(RoleMessage.Create)
  async createRole(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: CreateRoleDto,
  ) {
    const sessions = await this.redisService.getSessions(socket.nsp.name);
    const row = await this.roleService.createRole(body);
    return this.server.to(sessions).emit(RoleMessage.SyncCreate, row);
  }

  @RolePolicyMetadata(adminOnly)
  @UseGuards(AuthGuard, RoleGuard)
  @SubscribeMessage(RoleMessage.Update)
  async updateRole(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: UpdateRoleDto,
  ) {
    const sessions = await this.redisService.getSessions(socket.nsp.name);
    const row = await this.roleService.updateRole(body);
    return this.server.to(sessions).emit(RoleMessage.SyncUpdate, row);
  }

  @RolePolicyMetadata(adminOnly)
  @UseGuards(AuthGuard, RoleGuard)
  @SubscribeMessage(RoleMessage.Delete)
  async deleteRole(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: RoleParamDto,
  ) {
    const sessions = await this.redisService.getSessions(socket.nsp.name);
    await this.roleService.deleteRole(body.rid);
    return this.server.to(sessions).emit(RoleMessage.SyncDelete, body.rid);
  }

  @RolePolicyMetadata(adminOnly)
  @UseGuards(AuthGuard, RoleGuard)
  @SubscribeMessage(RoleMessage.SearchMember)
  async searchMember(@MessageBody() body: SearchUsersDto) {
    return await this.roleService.searchMember(body.rid, body.keyword);
  }

  @RolePolicyMetadata(adminOnly)
  @UseGuards(AuthGuard, RoleGuard)
  @SubscribeMessage(RoleMessage.AppendMember)
  async appendMember(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: RoleMemberParamDto,
  ) {
    const sessions = await this.redisService.getSessions(socket.nsp.name);
    const row = await this.roleService.appendMember(body.rid, body.uid);
    return this.server.to(sessions).emit(RoleMessage.SyncUpdate, row);
  }

  @RolePolicyMetadata(adminOnly)
  @UseGuards(AuthGuard, RoleGuard)
  @SubscribeMessage(RoleMessage.RemoveMember)
  async removeMember(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: RoleMemberParamDto,
  ) {
    const sessions = await this.redisService.getSessions(socket.nsp.name);
    const row = await this.roleService.removeMember(body.rid, body.uid);
    return this.server.to(sessions).emit(RoleMessage.SyncUpdate, row);
  }
}
