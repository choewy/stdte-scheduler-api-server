import { Body, Param, Query } from '@nestjs/common';
import { SwaggerController } from '@/core/swagger';
import { RoleRouter } from './role.router';
import { RoleService } from './role.service';
import {
  RoleRowDto,
  RoleParamDto,
  CreateRoleDto,
  UpdateRoleDto,
  UpdateRoleMemberDto,
  UpdateRoleMemberMethod,
  UpdateRoleMemberQueryDto,
} from './dto';

@SwaggerController({ path: 'roles', tag: '역할' })
export class RoleController {
  constructor(private readonly service: RoleService) {}

  @RoleRouter.GetRoles({ method: 'GET' })
  async getRoles(): Promise<RoleRowDto[]> {
    return await this.service.getRoles();
  }

  @RoleRouter.GetRole({ method: 'GET', path: ':id' })
  async getRole(@Param() param: RoleParamDto): Promise<RoleRowDto> {
    return await this.service.getRole(param);
  }

  @RoleRouter.CreateRole({ method: 'POST' })
  async createRole(@Body() body: CreateRoleDto): Promise<void> {
    return await this.service.createRole(body);
  }

  @RoleRouter.UpdateRole({ method: 'PATCH', path: ':id' })
  async updateRole(
    @Param() param: RoleParamDto,
    @Body() body: UpdateRoleDto,
  ): Promise<void> {
    return await this.service.updateRole(param, body);
  }

  @RoleRouter.UpdateRoleMember({ method: 'PATCH', path: ':id/member' })
  async updateRoleMember(
    @Param() param: RoleParamDto,
    @Query() query: UpdateRoleMemberQueryDto,
    @Body() body: UpdateRoleMemberDto,
  ): Promise<void> {
    switch (query.method) {
      case UpdateRoleMemberMethod.Append:
        return await this.service.appendRoleMember(param, body);

      case UpdateRoleMemberMethod.Remove:
        return await this.service.removeRoleMember(param, body);
    }
  }

  @RoleRouter.DeleteRole({ method: 'DELETE', path: ':id' })
  async deleteRole(@Param() param: RoleParamDto): Promise<void> {
    return await this.service.deleteRole(param);
  }
}
