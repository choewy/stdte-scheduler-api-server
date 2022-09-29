import { TeamStatus } from '@/core/typeorm/entities';
import { TeamParamDto, UpdateTeamMemberDto } from '../dto';
import { NotFoundTeamException } from '../team.exception';
import { TeamRepository } from '../team.repository';

export const appendTeamUsersEvent = async (
  repository: TeamRepository,
  param: TeamParamDto,
  body: UpdateTeamMemberDto,
): Promise<void> => {
  const team = await repository.findTeam(param);

  if (!team) {
    throw NotFoundTeamException;
  }

  const users = await repository.fundUsersByUserIds(body.userIds);

  users.forEach((user) => {
    user.teams = user.teams
      .filter(({ status }) => status !== TeamStatus.Default)
      .concat(team);
  });

  await repository.saveUsers(users);
};
