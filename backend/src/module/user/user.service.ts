import { localDateTime } from '@/core/datetime';
import { User } from '@/core/typeorm/entities';
import { Injectable } from '@nestjs/common';
import { Not } from 'typeorm';
import { CreateUserDto, UpdateUserDto, UserDto } from './dto';
import { UserParam } from './param';
import { UserException } from './user.exception';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {
  constructor(
    private readonly repository: UserRepository,
    private readonly exception: UserException,
  ) {}

  async getUsers(): Promise<UserDto[]> {
    const users = await this.repository.findMany(false);
    return users.map((user) => new UserDto(user));
  }

  async getUser(param: UserParam): Promise<UserDto> {
    const user = await this.repository.findOne(param, false);
    if (!user) this.exception.NotFoundUser();
    return new UserDto(user);
  }

  async createUser({
    roleIds,
    teamIds,
    ...body
  }: Partial<User> & CreateUserDto): Promise<void> {
    const check = await this.repository.findOne(
      { username: body.username },
      true,
    );
    if (check) this.exception.AlreadyExistUsername();
    return await this.repository.createOne(body, roleIds, teamIds);
  }

  async updateUser({ id }: UserParam, body: UpdateUserDto): Promise<void> {
    const user = await this.repository.findOne({ id }, false);

    if (!user) this.exception.NotFoundUser();

    if (body.email) {
      const other = await this.repository.findOne(
        {
          id: Not(id),
          email: body.email,
        },
        true,
      );

      if (other) this.exception.AlreadyExistEmail();
    }

    if (typeof body.status === 'boolean') {
      user.status = body.status;
      user.disabledAt = body.status ? null : localDateTime();
    }

    return await this.repository.saveOne(
      Object.assign<User, Partial<User>>(user, body),
    );
  }

  async deleteUser({ id }: UserParam): Promise<void> {
    const user = await this.repository.findOne({ id }, false);
    if (!user) this.exception.NotFoundUser();
    return await this.repository.deleteOne(id);
  }
}
