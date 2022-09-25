import { Injectable } from '@nestjs/common';
import { CoreRepository } from './core.repository';
import { JwtAuthService } from './jwt-auth';
import { User } from './typeorm/entities';

@Injectable()
export class CoreService {
  constructor(
    private readonly jwtAuthService: JwtAuthService,
    private readonly repository: CoreRepository,
  ) {}

  get globalToken(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const user = await this.repository.findUser({
        roles: { rolePolicy: { master: true } },
      });

      if (!user) reject();

      const token = this.jwtAuthService.sign('access', {
        id: user.id,
      });

      resolve(token);
    });
  }

  async initRole(): Promise<void> {
    const roles = [
      {
        name: '마스터',
        editable: false,
        visible: false,
        policy: {
          master: true,
        },
      },
      {
        name: '역할없음',
        editable: false,
        policy: {
          default: true,
        },
      },
      {
        name: '관리자',
        editable: false,
        policy: {
          admin: true,
        },
      },
    ];

    for (const role of roles) {
      const { policy, ...data } = role;
      await this.repository.createRole(data, policy);
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
    return await this.repository.createUser(data, {
      master: true,
      admin: true,
      manager: true,
      member: true,
    });
  }

  async initAdmin(data: Partial<User>): Promise<void> {
    return await this.repository.createUser(data, {
      admin: true,
      manager: true,
      member: true,
    });
  }
}
