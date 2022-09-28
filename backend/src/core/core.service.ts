import { Injectable } from '@nestjs/common';
import { hashPassword } from './bcrypt';
import { roleDataRows, teamDataRows } from './core.init-data';
import { CoreRepository } from './core.repository';
import { JwtAuthService } from './jwt-auth';
import { RolePolicy, RoleType, User, UserStatus } from './typeorm/entities';

@Injectable()
export class CoreService {
  constructor(
    private readonly jwtAuthService: JwtAuthService,
    private readonly repository: CoreRepository,
  ) {}

  get globalToken(): Promise<string> {
    return new Promise(async (resolve, reject) => {
      const type = RoleType.Master;
      const user = await this.repository.findUser(type);

      if (!user) {
        return reject('Master User Not Found');
      }

      const payload = { id: user.id };
      const token = this.jwtAuthService.sign('access', payload);

      resolve(token);
    });
  }

  async initRole(): Promise<void> {
    for (const row of roleDataRows) {
      const { range, data } = row;
      const { type } = data;

      let role = await this.repository.findRole(type);

      if (!role) {
        this.repository.transaction(async () => {
          role = await this.repository.saveRole(data);

          role.policy = new RolePolicy();
          role.policy.roleId = role.id;
          role.policy.read = range;
          role.policy.write = range;
          role.policy.update = range;
          role.policy.delete = range;

          await this.repository.saveRole(role);
        });
      }
    }
  }

  async initTeam(): Promise<void> {
    for (const row of teamDataRows) {
      const isDefault = row.default;
      const team = await this.repository.findTeam(isDefault);

      if (!team) {
        await this.repository.saveTeam(row);
      }
    }
  }

  async initMaster(data: Partial<User>): Promise<void> {
    const type = RoleType.Master;
    const user = await this.repository.findUser(type);

    if (!user) {
      const role = await this.repository.findRole(type);
      const user = new User();
      user.username = data.username;
      user.nickname = data.nickname;
      user.password = hashPassword(data.password);
      user.email = data.email;
      user.status = UserStatus.Enable;
      user.roles = [role];
      await this.repository.saveUser(user);
    }
  }

  async initAdmin(data: Partial<User>): Promise<void> {
    const type = RoleType.Admin;
    const user = await this.repository.findUser(type);

    if (!user) {
      const role = await this.repository.findRole(type);
      const user = new User();
      user.username = data.username;
      user.nickname = data.nickname;
      user.password = hashPassword(data.password);
      user.email = data.email;
      user.status = UserStatus.Enable;
      user.roles = [role];
      await this.repository.saveUser(user);
    }
  }
}
