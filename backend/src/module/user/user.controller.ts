import { SwaggerController } from '@/core/swagger';
import { Body, Param } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto, UserParamDto, UserRowDto } from './dto';
import { UserRouter } from './user.router';
import { UserService } from './user.service';

@SwaggerController({ path: 'users', tag: '사용자' })
export class UserController {
  constructor(private readonly service: UserService) {}

  @UserRouter.GetUsers({ method: 'GET' })
  async getUsers(): Promise<UserRowDto[]> {
    return await this.service.getUsers();
  }

  @UserRouter.GetUser({ method: 'GET', path: ':id' })
  async getUser(@Param() param: UserParamDto): Promise<UserRowDto> {
    return await this.service.getUser(param);
  }

  @UserRouter.CreateUser({ method: 'POST' })
  async createUser(@Body() body: CreateUserDto): Promise<void> {
    return await this.service.createUser(body);
  }

  @UserRouter.UpdateUser({ method: 'PATCH', path: ':id' })
  async updateUser(
    @Param() param: UserParamDto,
    @Body() body: UpdateUserDto,
  ): Promise<void> {
    return await this.service.updateUser(param, body);
  }

  @UserRouter.DeleteUser({ method: 'DELETE', path: ':id' })
  async deleteUser(@Param() param: UserParamDto): Promise<void> {
    return await this.service.deleteUser(param);
  }
}
