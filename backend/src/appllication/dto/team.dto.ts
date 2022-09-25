import { Team } from '@/core/typeorm/entities';
import { ApiResponseProperty } from '@nestjs/swagger';
import { Expose } from 'class-transformer';

export class TeamDto {
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
