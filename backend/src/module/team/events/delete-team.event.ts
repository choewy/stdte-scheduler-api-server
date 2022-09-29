import { TeamParamDto } from '../dto';
import { NotFoundTeamException } from '../team.exception';
import { TeamRepository } from '../team.repository';

export const deleteTeamEvent = async (
  repository: TeamRepository,
  param: TeamParamDto,
): Promise<void> => {
  const team = await repository.findTeam(param);

  if (!team) {
    throw NotFoundTeamException;
  }

  await repository.deleteTeam(param);
};
