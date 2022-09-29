import { Team, TeamSetting, TeamStatus } from '@/core/typeorm/entities';
import { CreateTeamDto } from '../dto';
import { AlreadyUsedTeamNameException } from '../team.exception';
import { TeamRepository } from '../team.repository';

export const createTeamEvent = async (
  repository: TeamRepository,
  body: CreateTeamDto,
): Promise<void> => {
  const params = { name: body.name };
  const check = await repository.findTeam(params);

  if (check) {
    throw AlreadyUsedTeamNameException;
  }

  return await repository.transaction(async () => {
    let team = new Team();
    team.name = body.name;
    team.status = TeamStatus.Private;

    team = await repository.saveTeam(team);
    team.setting = new TeamSetting();
    team.setting.teamId = team.id;

    await repository.saveTeam(team);
  });
};
