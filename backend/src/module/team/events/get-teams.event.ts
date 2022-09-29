import { TeamRowDto } from '../dto';
import { TeamRepository } from '../team.repository';

export const getTeamsEvent = async (
  repository: TeamRepository,
): Promise<TeamRowDto[]> => {
  const teams = await repository.findTeams();
  const users = await repository.findUsersByTeamIds(teams.map(({ id }) => id));

  return teams.map((team) => {
    const teamUsers = users.filter((user) =>
      user.teams.map((team) => team.id).includes(team.id),
    );

    return new TeamRowDto(team, teamUsers);
  });
};
