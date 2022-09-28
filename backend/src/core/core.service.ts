import { Injectable } from '@nestjs/common';
import { CoreRepository } from './core.repository';
import { JwtAuthService } from './jwt-auth';
import {
  PolicyStatus,
  Role,
  RolePolicy,
  RoleType,
  User,
} from './typeorm/entities';

@Injectable()
export class CoreService {
  constructor(
    private readonly jwtAuthService: JwtAuthService,
    private readonly repository: CoreRepository,
  ) {}

  get globalToken(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const user = await this.repository.findUser(RoleType.Master);

      if (!user) {
        return reject('Master User Not Found');
      }

      const token = this.jwtAuthService.sign('access', {
        id: user.id,
      });

      resolve(token);
    });
  }

  async initRole(): Promise<void> {
    const rows: Array<{ role: Partial<Role>; policy: Partial<RolePolicy> }> = [
      {
        role: {
          name: '마스터',
          type: RoleType.Master,
          visible: false,
          editable: false,
        },
        policy: {
          read: PolicyStatus.All,
          write: PolicyStatus.All,
          update: PolicyStatus.All,
          delete: PolicyStatus.All,
        },
      },
      {
        role: {
          name: '관리자',
          type: RoleType.Admin,
          visible: true,
          editable: false,
        },
        policy: {
          read: PolicyStatus.System,
          write: PolicyStatus.System,
          update: PolicyStatus.System,
          delete: PolicyStatus.System,
        },
      },
      {
        role: {
          name: '역할없음',
          type: RoleType.Default,
          visible: true,
          editable: false,
        },
        policy: {
          read: PolicyStatus.None,
          write: PolicyStatus.None,
          update: PolicyStatus.None,
          delete: PolicyStatus.None,
        },
      },
    ];

    for (const row of rows) {
      const { role, policy } = row;
      await this.repository.createRole(role, policy);
    }
  }

  async initTeam(): Promise<void> {
    const teams = [
      {
        name: '소속없음',
        default: true,
        editable: false,
      },
    ];

    for (const team of teams) {
      await this.repository.createTeam(team);
    }
  }

  async initMaster(data: Partial<User>): Promise<void> {
    return await this.repository.createUser(data, RoleType.Master);
  }

  async initAdmin(data: Partial<User>): Promise<void> {
    return await this.repository.createUser(data, RoleType.Admin);
  }
}
