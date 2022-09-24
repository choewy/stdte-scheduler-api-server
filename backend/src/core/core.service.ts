import { Injectable } from '@nestjs/common';
import { CoreRepository } from './core.repository';
import { JwtAuthService } from './jwt-auth';

@Injectable()
export class CoreService {
  constructor(
    private readonly jwtAuthService: JwtAuthService,
    private readonly repository: CoreRepository,
  ) {}

  async initDefaultRole(): Promise<void> {
    const role = await this.repository.findDefaultRole();
    if (!role) {
      await this.repository.insertDefaultRole();
    }
  }

  async initMasterRole(): Promise<void> {
    const role = await this.repository.findMasterRole();
    if (!role) {
      await this.repository.insertMasterRole();
    }
  }

  async initDefaultTeam(): Promise<void> {
    const team = await this.repository.findDefaultTeam();
    if (!team) {
      await this.repository.insertDefaultTeam();
    }
  }

  async initMasterUser(username: string, password: string): Promise<void> {
    const user = await this.repository.findUserByUsername(username);
    if (!user) {
      const role = await this.repository.findMasterRole();
      await this.repository.insertMaster(username, password, role);
    }
  }

  async getGlobalToken(username: string): Promise<string> {
    const user = await this.repository.findUserByUsername(username);
    return this.jwtAuthService.sign('access', { id: user.id });
  }
}
