import { AuthGuard, TypeGuard } from '@/core/common';
import { SetUserType } from '@/core/common/metadata';
import { ApiRequestType, ApiResponseType } from '@/core/swagger';
import { UserType } from '@/core/typeorm/entities';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  HttpStatus,
  Param,
  Patch,
  Post,
  Put,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateTeamBody,
  GetTeamParam,
  TeamDetailResponse,
  TeamListResponse,
  TeamMemberBody,
  TeamMemberMethodQuery,
  UpdateTeambody,
} from './dto';
import {
  AlreadyExistTeamNameException,
  NotFoundTeamException,
  NotFoundUserException,
} from './exceptions';
import { TeamService } from './team.service';

@ApiTags('팀')
@Controller('teams')
export class TeamController {
  constructor(private readonly service: TeamService) {}

  @Get()
  @ApiRequestType({
    summary: '팀 목록 조회',
    guards: [AuthGuard],
  })
  @ApiResponseType({
    type: TeamListResponse,
    errors: [
      UnauthorizedException,
      ForbiddenException,
      BadRequestException,
      AlreadyExistTeamNameException,
    ],
  })
  async getTeamList(): Promise<TeamListResponse> {
    return this.service.getTeamList();
  }

  @Get(':teamId')
  @ApiRequestType({
    summary: '팀 상세 목록 조회',
    guards: [AuthGuard],
  })
  @ApiResponseType({
    type: TeamDetailResponse,
    errors: [
      UnauthorizedException,
      ForbiddenException,
      BadRequestException,
      NotFoundTeamException,
    ],
  })
  async getTeamDetail(
    @Param() params: GetTeamParam,
  ): Promise<TeamDetailResponse> {
    return this.service.getTeamDetail(params.teamId);
  }

  @Post()
  @ApiRequestType({
    summary: '팀 생성',
    consume: 'x-www-form',
    metadata: [SetUserType(UserType.Admin)],
    guards: [AuthGuard, TypeGuard],
  })
  @ApiResponseType({
    errors: [
      UnauthorizedException,
      ForbiddenException,
      BadRequestException,
      AlreadyExistTeamNameException,
    ],
  })
  async createTeam(@Body() body: CreateTeamBody): Promise<void> {
    return this.service.createTeam(body);
  }

  @Patch(':teamId')
  @ApiRequestType({
    summary: '팀 수정',
    consume: 'x-www-form',
    metadata: [SetUserType(UserType.Admin)],
    guards: [AuthGuard, TypeGuard],
  })
  @ApiResponseType({
    status: HttpStatus.NO_CONTENT,
    errors: [
      UnauthorizedException,
      ForbiddenException,
      BadRequestException,
      NotFoundTeamException,
      AlreadyExistTeamNameException,
    ],
  })
  async updateTeam(
    @Param() params: GetTeamParam,
    @Body() body: UpdateTeambody,
  ): Promise<void> {
    return this.service.updateTeam(params.teamId, body);
  }

  @Put(':teamId')
  @ApiRequestType({
    summary: '팀 멤버 추가/삭제',
    metadata: [SetUserType(UserType.Admin)],
    guards: [AuthGuard, TypeGuard],
    consume: 'x-www-form',
  })
  @ApiResponseType({
    status: HttpStatus.NO_CONTENT,
    errors: [
      UnauthorizedException,
      ForbiddenException,
      BadRequestException,
      NotFoundTeamException,
      NotFoundUserException,
    ],
  })
  async updateTeamMember(
    @Param() params: GetTeamParam,
    @Query() queryParams: TeamMemberMethodQuery,
    @Body() body: TeamMemberBody,
  ): Promise<void> {
    return this.service.updateTeamMember(
      params.teamId,
      queryParams.method,
      body.userId,
    );
  }

  @Delete(':teamId')
  @ApiRequestType({
    summary: '팀 삭제',
    metadata: [SetUserType(UserType.Admin)],
    guards: [AuthGuard, TypeGuard],
  })
  @ApiResponseType({
    status: HttpStatus.NO_CONTENT,
    errors: [
      UnauthorizedException,
      ForbiddenException,
      BadRequestException,
      NotFoundTeamException,
    ],
  })
  async deleteTeam(@Param() params: GetTeamParam): Promise<void> {
    return this.service.deleteTeam(params.teamId);
  }
}
