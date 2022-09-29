import { SwaggerController } from '@/core/swagger';
import { RoleType } from '@/core/typeorm/entities';
import { Body, Param } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserParamDto, UserRowDto } from './dto';
import { UserRepository } from './user.repository';
import { UserRouter } from './user.router';
import {
  createUserEvent,
  deleteUserEvent,
  getUserEvent,
  getUsersEvent,
  updateUserEvent,
} from './events';

@SwaggerController({ path: 'users', tag: '사용자' })
export class UserController {
  private readonly EXCLUDE_ROLE_TYPES = [RoleType.Master, RoleType.Admin];

  constructor(private readonly repository: UserRepository) {}

  @UserRouter.GetUsers({ method: 'GET' })
  async getUsers(): Promise<UserRowDto[]> {
    return await getUsersEvent(this.repository, this.EXCLUDE_ROLE_TYPES);
  }

  @UserRouter.GetUser({ method: 'GET', path: ':id' })
  async getUser(@Param() param: UserParamDto): Promise<UserRowDto> {
    return await getUserEvent(this.repository, this.EXCLUDE_ROLE_TYPES, param);
  }

  @UserRouter.CreateUser({ method: 'POST' })
  async createUser(@Body() body: CreateUserDto): Promise<void> {
    return await createUserEvent(
      this.repository,
      this.EXCLUDE_ROLE_TYPES,
      body,
    );
  }

  @UserRouter.UpdateUser({ method: 'PATCH', path: ':id' })
  async updateUser(
    @Param() param: UserParamDto,
    @Body() body: UpdateUserDto,
  ): Promise<void> {
    return await updateUserEvent(
      this.repository,
      this.EXCLUDE_ROLE_TYPES,
      param,
      body,
    );
  }

  @UserRouter.DeleteUser({ method: 'DELETE', path: ':id' })
  async deleteUser(@Param() param: UserParamDto): Promise<void> {
    return await deleteUserEvent(
      this.repository,
      this.EXCLUDE_ROLE_TYPES,
      param,
    );
  }
}
