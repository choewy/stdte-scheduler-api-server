import { Body, Param, Query } from '@nestjs/common';
import { SwaggerController } from '@/core/swagger';
import { RoleRepository } from './role.repository';
import { RoleRouter } from './role.router';
import {
  RoleRowDto,
  RoleParamDto,
  CreateRoleDto,
  UpdateRoleDto,
  UpdateRoleMemberDto,
  UpdateRoleMemberMethod,
  UpdateRoleMemberQueryDto,
} from './dto';
import {
  appendRoleUsersEvent,
  removeRoleUsersEvent,
  createRoleEvent,
  deleteRoleEvent,
  getRoleEvent,
  getRolesEvent,
  updateRoleEvent,
} from './events';

@SwaggerController({ path: 'roles', tag: '역할' })
export class RoleController {
  constructor(private readonly repository: RoleRepository) {}

  @RoleRouter.GetRoles({ method: 'GET' })
  async getRoles(): Promise<RoleRowDto[]> {
    return await getRolesEvent(this.repository);
  }

  @RoleRouter.GetRole({ method: 'GET', path: ':id' })
  async getRole(@Param() param: RoleParamDto): Promise<RoleRowDto> {
    return await getRoleEvent(this.repository, param);
  }

  @RoleRouter.CreateRole({ method: 'POST' })
  async createRole(@Body() body: CreateRoleDto): Promise<void> {
    return await createRoleEvent(this.repository, body);
  }

  @RoleRouter.UpdateRole({ method: 'PATCH', path: ':id' })
  async updateRole(
    @Param() param: RoleParamDto,
    @Body() body: UpdateRoleDto,
  ): Promise<void> {
    return await updateRoleEvent(this.repository, param, body);
  }

  @RoleRouter.UpdateRoleMembers({ method: 'PATCH', path: ':id/members' })
  async updateRoleMember(
    @Param() param: RoleParamDto,
    @Query() query: UpdateRoleMemberQueryDto,
    @Body() body: UpdateRoleMemberDto,
  ): Promise<void> {
    switch (query.method) {
      case UpdateRoleMemberMethod.Append:
        return await appendRoleUsersEvent(this.repository, param, body);

      case UpdateRoleMemberMethod.Remove:
        return await removeRoleUsersEvent(this.repository, param, body);
    }
  }

  @RoleRouter.DeleteRole({ method: 'DELETE', path: ':id' })
  async deleteRole(@Param() param: RoleParamDto): Promise<void> {
    return await deleteRoleEvent(this.repository, param);
  }
}
