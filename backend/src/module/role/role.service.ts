import { Injectable } from '@nestjs/common';
import { In, Not } from 'typeorm';
import { RoleException } from './role.exception';
import { RoleRepository } from './role.repository';
import {
  RoleRowDto,
  RoleParamDto,
  CreateRoleDto,
  UpdateRoleDto,
  UpdateRoleMemberDto,
} from './dto';
import { RoleType } from '@/core/typeorm/entities';

@Injectable()
export class RoleService {
  constructor(
    private readonly repository: RoleRepository,
    private readonly exception: RoleException,
  ) {}

  async getRoles(): Promise<RoleRowDto[]> {
    const roles = await this.repository.findMany({
      type: Not(In([RoleType.Master, RoleType.Default])),
    });

    const users = await this.repository.findUsers({
      roles: { id: In(roles.map(({ id }) => id)) },
    });

    return roles.map((role) => {
      const members = users.filter(({ roles }) => {
        const roleIds = roles.map(({ id }) => id);
        return roleIds.includes(role.id);
      });

      return new RoleRowDto(role, members);
    });
  }

  async getRole({ id }: RoleParamDto) {
    const role = await this.repository.findOne({
      id,
      type: Not(RoleType.Master),
    });

    if (!role) {
      this.exception.NotFoundRole();
    }

    const users = await this.repository.findUsers({
      roles: { id: In([role.id]) },
    });

    return new RoleRowDto(role, users);
  }

  async createRole(body: CreateRoleDto): Promise<void> {
    const { name } = body;

    const check = await this.repository.findOne({ name });

    if (check) {
      this.exception.AlreadyExistRole();
    }

    return await this.repository.createOne(body);
  }

  async updateRole({ id }: RoleParamDto, body: UpdateRoleDto): Promise<void> {
    const role = await this.repository.findOne({
      id,
      type: Not(In([RoleType.Master, RoleType.Admin, RoleType.Default])),
    });

    if (!role) {
      this.exception.NotFoundRole();
    }

    const { name } = body;

    if (name) {
      const check = await this.repository.findOne({ id: Not(id), name });
      if (check) this.exception.AlreadyExistRoleName();
    }

    return await this.repository.saveOne(Object.assign(role, body));
  }

  async appendRoleMember(
    { id }: RoleParamDto,
    { userIds }: UpdateRoleMemberDto,
  ): Promise<void> {
    const role = await this.repository.findOne({
      id,
      type: Not(In([RoleType.Master, RoleType.Admin, RoleType.Default])),
    });

    const users = await this.repository.findUsers({
      id: In(userIds),
      roles: {
        type: Not(In([RoleType.Master, RoleType.Admin, RoleType.Default])),
      },
    });

    users.forEach((user) => {
      user.roles = user.roles
        .filter((role) => role.type !== RoleType.Default)
        .concat(role);
    });

    await this.repository.saveUsers(users);
  }

  async removeRoleMember(
    { id }: RoleParamDto,
    { userIds }: UpdateRoleMemberDto,
  ): Promise<void> {
    const role = await this.repository.findOne({
      id,
      type: Not(In([RoleType.Master, RoleType.Admin, RoleType.Default])),
    });

    const defaultRole = await this.repository.findOne({
      type: RoleType.Default,
    });

    const users = await this.repository.findUsers({
      id: In(userIds),
      roles: { type: Not(In([RoleType.Master, RoleType.Default])) },
    });

    users.forEach((user) => {
      user.roles = user.roles.filter(({ id }) => id !== role.id);
      !user.roles.length && user.roles.push(defaultRole);
    });

    await this.repository.saveUsers(users);
  }

  async deleteRole({ id }: RoleParamDto): Promise<void> {
    const role = await this.repository.findOne({
      id,
      type: Not(In([RoleType.Master, RoleType.Admin, RoleType.Default])),
    });

    if (!role) {
      this.exception.NotFoundRole();
    }

    await this.repository.deleteOne(role);
  }
}
