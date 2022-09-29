import { TeamRepository } from '../team.repository';
import { TeamParamDto, UpdateTeamDto } from '../dto';
import {
  AlreadyUsedTeamNameException,
  NotFoundTeamException,
} from '../team.exception';

export const updateTeamEvent = async (
  repository: TeamRepository,
  param: TeamParamDto,
  body: UpdateTeamDto,
): Promise<void> => {
  const team = await repository.findTeam(param);

  if (!team) {
    throw NotFoundTeamException;
  }

  if (team.name) {
    const params = { name: body.name };
    const check = await repository.findTeam(params);

    if (check) {
      throw AlreadyUsedTeamNameException;
    }

    team.name = body.name;
  }

  if (team.status) {
    team.status = body.status;
  }

  await repository.saveTeam(team);
};
