import { classConstructor } from '@/core';
import { Role, RoleQuery, RoleAndUserQuery, UserQuery } from '@/typeorm';
import { Injectable } from '@nestjs/common';
import { WsException } from '@nestjs/websockets';
import { DataSource } from 'typeorm';
import { CreateRoleDto, UpdateRoleDto } from './dto';
import { RoleRvo, roleRvoConstructor, RoleUserRvo } from './rvo';

@Injectable()
export class RoleService {
  private readonly roleQuery: RoleQuery;
  private readonly userQuery: UserQuery;
  private readonly roleAndUserQuery: RoleAndUserQuery;

  constructor(private readonly dataSource: DataSource) {
    this.roleQuery = new RoleQuery(this.dataSource);
    this.userQuery = new UserQuery(this.dataSource);
    this.roleAndUserQuery = new RoleAndUserQuery(this.dataSource);
  }

  async getRoles(): Promise<RoleRvo[]> {
    const rows = await this.roleQuery.selectRoleQuery().getMany();
    return rows.map((row) => roleRvoConstructor(row));
  }

  async createRole(body: CreateRoleDto): Promise<RoleRvo> {
    const role = await this.roleQuery
      .selectRoleQuery({ name: body.name })
      .getOne();

    if (role) {
      throw new WsException({
        status: 400,
        error: 'Conflict',
        message: '이미 존재하는 역할명은 사용할 수 없습니다.',
      });
    }

    const { identifiers } = await this.roleQuery.repository.insert(
      classConstructor(new Role(), { name: body.name }),
    );

    return roleRvoConstructor(
      await this.roleQuery
        .selectRoleQuery({ rid: identifiers[0].rid })
        .getOne(),
    );
  }

  async updateRole({ rid, ...body }: UpdateRoleDto): Promise<RoleRvo> {
    const role = await this.roleQuery.selectRoleQuery({ rid }).getOne();

    if (!role) {
      throw new WsException({
        status: 400,
        error: 'NotFound',
        message: '존재하지 않는 역할입니다.',
      });
    }

    if (body.name) {
      const role = await this.roleQuery
        .selectRoleQuery({ name: body.name })
        .getOne();

      if (role && role.rid !== rid) {
        throw new WsException({
          status: 400,
          error: 'Conflict',
          message: '이미 존재하는 역할명은 사용할 수 없습니다.',
        });
      }
    }

    await this.roleQuery.repository.update({ rid }, body);

    return roleRvoConstructor(
      await this.roleQuery.selectRoleQuery({ rid }).getOne(),
    );
  }

  async deleteRole(rid: number): Promise<void> {
    const role = await this.roleQuery.selectRoleQuery({ rid }).getOne();

    if (!role) {
      throw new WsException({
        status: 400,
        error: 'NotFound',
        message: '존재하지 않는 역할입니다.',
      });
    }

    await this.roleQuery.repository.delete({ rid });
  }

  async searchUser(rid: number, keyword: string): Promise<RoleUserRvo[]> {
    if (!keyword) {
      return [];
    }

    const rows = await this.userQuery.selectUserByKeywordNotInRoleExecute(
      rid,
      keyword,
    );

    return rows.map((row) => classConstructor(new RoleUserRvo(), row));
  }

  async appendMember(rid: number, uid: number): Promise<RoleRvo> {
    await this.roleAndUserQuery.repository.insert({ rid, uid });
    const role = await this.roleQuery.selectRoleQuery({ rid }).getOne();

    if (!role) {
      throw new WsException({
        status: 400,
        error: 'NotFound',
        message: '존재하지 않는 역할입니다.',
      });
    }

    return roleRvoConstructor(role);
  }

  async removeMember(rid: number, uid: number): Promise<RoleRvo> {
    await this.roleAndUserQuery.repository.delete({ rid, uid });
    const role = await this.roleQuery.selectRoleQuery({ rid }).getOne();

    if (!role) {
      throw new WsException({
        status: 400,
        error: 'NotFound',
        message: '존재하지 않는 역할입니다.',
      });
    }

    return roleRvoConstructor(role);
  }
}
