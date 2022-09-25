import { Team, User } from '@/core/typeorm/entities';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import { TeamUserDto } from './team-user.dto';

export class TeamRowDto {
  @ApiResponseProperty()
  @Expose()
  id: number;

  @ApiResponseProperty()
  @Expose()
  name: string;

  @ApiResponseProperty({ type: [TeamUserDto] })
  @Expose()
  users: TeamUserDto[];

  constructor(team?: Partial<Team>, users?: Partial<User>[]) {
    if (team) {
      this.id = team.id;
      this.name = team.name;

      if (users) {
        this.users = users.map((user) => new TeamUserDto(user));
      }
    }
  }
}
