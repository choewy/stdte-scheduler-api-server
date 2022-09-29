import { TeamParamDto, TeamRowDto } from '../dto';
import { NotFoundTeamException } from '../team.exception';
import { TeamRepository } from '../team.repository';

export const getTeamEvent = async (
  repositry: TeamRepository,
  param: TeamParamDto,
): Promise<TeamRowDto> => {
  const team = await repositry.findTeam(param);

  if (!team) {
    throw NotFoundTeamException;
  }

  const users = await repositry.findUsersByTeamIds([team.id]);

  return new TeamRowDto(team, users);
};
