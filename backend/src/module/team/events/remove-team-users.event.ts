import { TeamStatus } from '@/core/typeorm/entities';
import { TeamParamDto, UpdateTeamMemberDto } from '../dto';
import { NotFoundTeamException } from '../team.exception';
import { TeamRepository } from '../team.repository';

export const removeTeamUsersEvent = async (
  repository: TeamRepository,
  param: TeamParamDto,
  body: UpdateTeamMemberDto,
): Promise<void> => {
  const team = await repository.findTeam(param);

  if (!team) {
    throw NotFoundTeamException;
  }

  const defaultTeam = await repository.findTeam({ status: TeamStatus.Default });
  let users = await repository.findUsersByTeamIds([team.id]);

  users = users.filter(({ id }) => body.userIds.includes(id));
  users.forEach((user) => {
    user.teams = user.teams.filter(({ id }) => id !== team.id);

    if (user.teams.length === 0) {
      user.teams.push(defaultTeam);
    }
  });

  await repository.saveUsers(users);
};
