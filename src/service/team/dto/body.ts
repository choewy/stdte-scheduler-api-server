import { ApiProperty, PartialType, PickType } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateTeamBody {
  @ApiProperty({
    description: '팀 이름',
  })
  @IsNotEmpty()
  @IsString()
  name: string;
}

export class UpdateTeambody extends PartialType(
  PickType(CreateTeamBody, ['name']),
) {}

export class TeamMemberBody {
  @ApiProperty({
    description: '사용자 PK',
  })
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
