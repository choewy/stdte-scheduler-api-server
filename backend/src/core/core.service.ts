import { Injectable } from '@nestjs/common';
import { JwtAuthService } from './jwt-auth';
import { UserRepository, RoleRepository } from './typeorm/repositories';

@Injectable()
export class CoreService {
  constructor(
    private readonly jwtAuthService: JwtAuthService,
    private readonly userRepository: UserRepository,
    private readonly roleRepositoy: RoleRepository,
  ) {}

  async initDefaultRole(): Promise<void> {
    const role = await this.roleRepositoy.findDefaultRole();
    if (!role) {
      await this.roleRepositoy.insertDefaultRole();
    }
  }

  async initMasterRole(): Promise<void> {
    const role = await this.roleRepositoy.findMasterRole();
    if (!role) {
      await this.roleRepositoy.insertMasterRole();
    }
  }

  async initMasterUser(username: string, password: string): Promise<void> {
    const user = await this.userRepository.findOneByUsername(username);
    if (!user) {
      const role = await this.roleRepositoy.findMasterRole();
      await this.userRepository.insertMaster(username, password, role);
    }
  }

  async getGlobalToken(username: string): Promise<string> {
    const user = await this.userRepository.findOneByUsername(username);
    return this.jwtAuthService.sign('access', { id: user.id });
  }
}
