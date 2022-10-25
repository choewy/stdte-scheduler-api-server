import { WSModuleGateway } from '@/core';
import { connectMaps } from '@/core/redis';
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
import { RoleService } from './role.service';

@WSModuleGateway()
export class RoleGateway {
  @WebSocketServer() private readonly server: Server;

  constructor(private readonly roleService: RoleService) {}

  @UseGuards(AuthGuard)
  @SubscribeMessage('role:all')
  async getRoles() {
    return await this.roleService.getRoles();
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('role:create')
  async createRole(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: CreateRoleDto,
  ) {
    const row = await this.roleService.createRole(body);
    return this.server
      .to(connectMaps[socket.nsp.name])
      .emit('role:create:sync', row);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('role:update')
  async updateRole(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: UpdateRoleDto,
  ) {
    const row = await this.roleService.updateRole(body);
    return this.server
      .to(connectMaps[socket.nsp.name])
      .emit('role:update:sync', row);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('role:delete')
  async deleteRole(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: RoleParamDto,
  ) {
    await this.roleService.deleteRole(body.rid);
    return this.server
      .to(connectMaps[socket.nsp.name])
      .emit('role:delete:sync', body.rid);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('role:member:search')
  async searchMember(@MessageBody() body: SearchUsersDto) {
    return await this.roleService.searchMember(body.rid, body.keyword);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('role:member:append')
  async appendMember(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: RoleMemberParamDto,
  ) {
    const row = await this.roleService.appendMember(body.rid, body.uid);
    return this.server
      .to(connectMaps[socket.nsp.name])
      .emit('role:update:sync', row);
  }

  @UseGuards(AuthGuard)
  @SubscribeMessage('role:member:remove')
  async removeMember(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: RoleMemberParamDto,
  ) {
    const row = await this.roleService.removeMember(body.rid, body.uid);
    return this.server
      .to(connectMaps[socket.nsp.name])
      .emit('role:update:sync', row);
  }
}
