import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetTeamParam {
  @ApiProperty({
    description: '팀 PK',
  })
  @IsNotEmpty()
  @IsNumber()
  teamId: number;
}
