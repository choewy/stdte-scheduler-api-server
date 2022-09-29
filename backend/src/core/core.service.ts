import { Injectable } from '@nestjs/common';
import { hashPassword } from './bcrypt';
import { roleDataRows, teamDataRows } from './core.init-data';
import { CoreRepository } from './core.repository';
import { JwtAuthService, JwtType } from './jwt-auth';
import {
  Role,
  RolePolicy,
  RoleType,
  Team,
  TeamSetting,
  TeamStatus,
  User,
  UserStatus,
} from './typeorm/entities';

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
      const token = this.jwtAuthService.sign(JwtType.AccesToken, payload);

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
          role = new Role();
          role.type = data.type;
          role.name = data.name;
          role.visible = data.visible;
          role.editable = data.editable;

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
      let team = await this.repository.findTeam(TeamStatus.Default);

      if (!team) {
        this.repository.transaction(async () => {
          team = new Team();
          team.name = row.name;
          team.status = row.status;

          team = await this.repository.saveTeam(team);
          team.setting = new TeamSetting();
          team.setting.teamId = team.id;

          await this.repository.saveTeam(team);
        });
      }
    }
  }

  async initMaster(data: Partial<User>): Promise<void> {
    const type = RoleType.Master;
    let user = await this.repository.findUser(type);

    if (!user) {
      await this.repository.transaction(async () => {
        user = new User();
        user.username = data.username;
        user.nickname = data.nickname;
        user.password = hashPassword(data.password);
        user.email = data.email;
        user.status = UserStatus.Enable;
        user = await this.repository.saveUser(user);

        const role = await this.repository.findRole(type);
        user.roles = [role];
        user = await this.repository.saveUser(user);
      });
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
