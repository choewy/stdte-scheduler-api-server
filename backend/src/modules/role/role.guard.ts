import { User } from '@/typeorm';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { WsException } from '@nestjs/websockets';
import { Observable } from 'rxjs';
import { Socket } from 'socket.io';
import { RolePolicyMetadataKey, RolePolicyMetadataType } from './role.metadata';

@Injectable()
export class RoleGuard implements CanActivate {
  constructor(private readonly reflector: Reflector) {}

  canActivate(
    ctx: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const socket = ctx.switchToWs().getClient<Socket>();
    const user = socket['user'] as User;

    if (!user) {
      throw new WsException({
        status: 401,
        error: 'Unauthorized',
        message: '접근 권한이 없습니다.',
      });
    }

    const policies = this.reflector.get<RolePolicyMetadataType>(
      RolePolicyMetadataKey,
      ctx.getHandler(),
    );

    if (!policies) {
      throw new Error('RolePolicyMetadata is Undefined.');
    }

    const policyKeys = Object.keys(policies);

    if (policyKeys.length === 0) {
      return true;
    }

    let pass = false;

    user.roles.forEach((role) => {
      if (pass === true) {
        return;
      }

      policyKeys.forEach((key) => {
        if (role[key] === policies[key]) {
          pass = true;
          return;
        }
      });
    });

    return pass;
  }
}
