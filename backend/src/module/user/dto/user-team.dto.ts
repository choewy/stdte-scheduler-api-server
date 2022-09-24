import { Team } from '@/core/typeorm';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class UserTeamDto {
  @ApiResponseProperty()
  @Expose()
  id: number;

  @ApiResponseProperty()
  @Expose()
  name: string;

  constructor(team?: Team) {
    if (team) {
      this.id = team.id;
      this.name = team.name;
    }
  }
}
