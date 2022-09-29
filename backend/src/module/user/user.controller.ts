import { SwaggerController } from '@/core/swagger';
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
  constructor(private readonly repository: UserRepository) {}

  @UserRouter.GetUsers({ method: 'GET' })
  async getUsers(): Promise<UserRowDto[]> {
    return await getUsersEvent(this.repository);
  }

  @UserRouter.GetUser({ method: 'GET', path: ':id' })
  async getUser(@Param() param: UserParamDto): Promise<UserRowDto> {
    return await getUserEvent(this.repository, param);
  }

  @UserRouter.CreateUser({ method: 'POST' })
  async createUser(@Body() body: CreateUserDto): Promise<void> {
    return await createUserEvent(this.repository, body);
  }

  @UserRouter.UpdateUser({ method: 'PATCH', path: ':id' })
  async updateUser(
    @Param() param: UserParamDto,
    @Body() body: UpdateUserDto,
  ): Promise<void> {
    return await updateUserEvent(this.repository, param, body);
  }

  @UserRouter.DeleteUser({ method: 'DELETE', path: ':id' })
  async deleteUser(@Param() param: UserParamDto): Promise<void> {
    return await deleteUserEvent(this.repository, param);
  }
}
