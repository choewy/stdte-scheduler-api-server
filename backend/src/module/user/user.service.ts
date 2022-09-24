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
    username,
    password,
    nickname,
    email,
    roleIds,
    teamIds,
  }: CreateUserDto): Promise<void> {
    const check = await this.repository.findOne({ username });

    if (check) {
      throw this.exception.AlreadyExistUser();
    }

    await this.repository.saveOne({
      username,
      nickname,
      email,
      password: hashPassword(password),
      roles: roleIds
        ? await this.repository.findRoleByIds(roleIds)
        : await this.repository.findDefaultRole(),
      teams: teamIds
        ? await this.repository.findTeamByIds(teamIds)
        : await this.repository.findDefaultTeam(),
    });
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
      if (status === true) {
        user.disabledAt = LocalDateTime();
      } else {
        user.disabledAt = null;
      }
    }

    await this.repository.saveOne(
      Object.assign<User, Partial<User>>(user, {
        nickname,
        email,
      }),
    );
  }
}
