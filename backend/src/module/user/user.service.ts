import { hashPassword } from '@/core/bcrypt';
import { LocalDateTime } from '@/core/datetime';
import { User } from '@/core/typeorm/entities';
import { Injectable } from '@nestjs/common';
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
    const users = await this.repository.find();
    return users.map((user) => new UserDto(user));
  }

  async getUser(param: UserParam): Promise<UserDto> {
    const user = await this.repository.findOne(param);

    if (!user) {
      throw this.exception.NotFoundUser();
    }

    return new UserDto(user);
  }

  async createUser({
    roleIds,
    teamIds,
    ...body
  }: Partial<User> & CreateUserDto): Promise<void> {
    const check = await this.repository.findOne({ username: body.username });

    if (check) {
      throw this.exception.AlreadyExistUser();
    }

    body.password = hashPassword(body.password);

    body.roles = roleIds
      ? await this.repository.findRoleByIds(roleIds)
      : await this.repository.findDefaultRole();

    body.teams = teamIds
      ? await this.repository.findTeamByIds(teamIds)
      : await this.repository.findDefaultTeam();

    return await this.repository.saveOne(body);
  }

  async updateUser(
    { id }: UserParam,
    { nickname, email, password, status }: UpdateUserDto,
  ): Promise<void> {
    const user = await this.repository.findOne({ id });

    if (!user) {
      throw this.exception.NotFoundUser();
    }

    if (password) {
      user.password = hashPassword(password);
    }

    if (typeof status === 'boolean') {
      user.status = status;
      user.disabledAt = status ? null : LocalDateTime();
    }

    return await this.repository.saveOne(
      Object.assign<User, Partial<User>>(user, {
        nickname,
        email,
      }),
    );
  }

  async deleteUser({ id }: UserParam): Promise<void> {
    const user = await this.repository.findOne({ id });

    if (!user) {
      throw this.exception.NotFoundUser();
    }

    return await this.repository.deleteOne(id);
  }
}
