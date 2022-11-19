import { AuthGuard, SetUserType, TypeGuard } from '@/core/common';
import { ApiRequestType, ApiResponseType } from '@/core/swagger';
import { UserType } from '@/core/typeorm/entities';
import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import {
  CreateTaskBody,
  GetTaskParam,
  TaskListResponse,
  TaskTeamBody,
  TaskTeamMethodQuery,
} from './dto';
import {
  AlreadyExistTaskCodeException,
  CannotAddOrRemoveTeamGlobalTaskEXception,
  NotFoundTaskException,
  NotFoundTeamException,
} from './exceptions';
import { TaskService } from './task.service';

@ApiTags('사업')
@Controller('tasks')
export class TaskController {
  constructor(private readonly service: TaskService) {}

  @Get()
  @ApiRequestType({
    summary: '사업 목록 조회',
    guards: [AuthGuard],
  })
  @ApiResponseType({
    type: TaskListResponse,
    errors: [UnauthorizedException],
  })
  async getTaskList() {
    return this.service.getTaskList();
  }

  @Post()
  @ApiRequestType({
    summary: '사업 등록',
    metadata: [SetUserType(UserType.Manager)],
    guards: [AuthGuard, TypeGuard],
    consume: 'x-www-form',
  })
  @ApiResponseType({
    errors: [
      UnauthorizedException,
      ForbiddenException,
      BadRequestException,
      AlreadyExistTaskCodeException,
    ],
  })
  async createTask(@Body() body: CreateTaskBody): Promise<void> {
    return this.service.createTask(body);
  }

  @Put(':taskId')
  @ApiRequestType({
    summary: '사업 부서 등록/삭제',
    metadata: [SetUserType(UserType.Leader)],
    guards: [AuthGuard, TypeGuard],
    consume: 'x-www-form',
  })
  @ApiResponseType({
    status: HttpStatus.NO_CONTENT,
    errors: [
      UnauthorizedException,
      ForbiddenException,
      BadRequestException,
      NotFoundTaskException,
      NotFoundTeamException,
      CannotAddOrRemoveTeamGlobalTaskEXception,
    ],
  })
  async updateTaskTeam(
    @Param() params: GetTaskParam,
    @Query() queryParams: TaskTeamMethodQuery,
    @Body() body: TaskTeamBody,
  ): Promise<void> {
    return this.service.updateTaskTeam(
      params.taskId,
      queryParams.method,
      body.teamId,
    );
  }
}
