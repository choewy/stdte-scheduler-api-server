import { WSModuleGateway } from '@/core';
import { RedisService } from '@/core/redis';
import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketServer,
} from '@nestjs/websockets';
import { Socket, Server } from 'socket.io';
import { AuthGuard } from '../auth';
import { RolePolicyMetadata, RoleGuard } from '../role';
import {
  CreateTeamDto,
  SearchUsersDto,
  TeamMemberParamDto,
  TeamParamDto,
  UpdateTeamDto,
} from './dto';
import { TeamMessage } from './enums';
import { adminOnly } from './policy';
import { TeamService } from './team.service';

@WSModuleGateway()
export class TeamGateWay {
  @WebSocketServer() private readonly server: Server;

  constructor(
    private readonly redisService: RedisService,
    private readonly teamService: TeamService,
  ) {}

  @UseGuards(AuthGuard)
  @SubscribeMessage(TeamMessage.All)
  async getTeams() {
    return await this.teamService.getTeams();
  }

  @RolePolicyMetadata(adminOnly)
  @UseGuards(AuthGuard, RoleGuard)
  @SubscribeMessage(TeamMessage.Create)
  async createTeam(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: CreateTeamDto,
  ) {
    const sessions = await this.redisService.getSessions(socket.nsp.name);
    const row = await this.teamService.createTeam(body);
    return this.server.to(sessions).emit(TeamMessage.SyncCreate, row);
  }

  @RolePolicyMetadata(adminOnly)
  @UseGuards(AuthGuard, RoleGuard)
  @SubscribeMessage(TeamMessage.Update)
  async updateTeam(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: UpdateTeamDto,
  ) {
    const sessions = await this.redisService.getSessions(socket.nsp.name);
    const row = await this.teamService.updateTeam(body);
    return this.server.to(sessions).emit(TeamMessage.SyncUpdate, row);
  }

  @RolePolicyMetadata(adminOnly)
  @UseGuards(AuthGuard, RoleGuard)
  @SubscribeMessage(TeamMessage.Delete)
  async deleteTeam(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: TeamParamDto,
  ) {
    const sessions = await this.redisService.getSessions(socket.nsp.name);
    await this.teamService.deleteTeam(body.tid);
    return this.server.to(sessions).emit(TeamMessage.SyncDelete, body.tid);
  }

  @RolePolicyMetadata(adminOnly)
  @UseGuards(AuthGuard, RoleGuard)
  @SubscribeMessage(TeamMessage.SearchUser)
  async searchUser(@MessageBody() body: SearchUsersDto) {
    return await this.teamService.searchUser(body.tid, body.keyword);
  }

  @RolePolicyMetadata(adminOnly)
  @UseGuards(AuthGuard, RoleGuard)
  @SubscribeMessage(TeamMessage.AppendMember)
  async appendMember(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: TeamMemberParamDto,
  ) {
    const sessions = await this.redisService.getSessions(socket.nsp.name);
    const row = await this.teamService.appendMember(body.tid, body.uid);
    return this.server.to(sessions).emit(TeamMessage.SyncUpdate, row);
  }

  @RolePolicyMetadata(adminOnly)
  @UseGuards(AuthGuard, RoleGuard)
  @SubscribeMessage(TeamMessage.RemoveMember)
  async removeMember(
    @ConnectedSocket() socket: Socket,
    @MessageBody() body: TeamMemberParamDto,
  ) {
    const sessions = await this.redisService.getSessions(socket.nsp.name);
    const row = await this.teamService.removeMember(body.tid, body.uid);
    return this.server.to(sessions).emit(TeamMessage.SyncUpdate, row);
  }
}
