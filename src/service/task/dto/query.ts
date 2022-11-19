import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsString } from 'class-validator';
import { TaskTeamMethod } from './enums';

export class TaskTeamMethodQuery {
  @ApiProperty({
    description: '삭제/추가',
    enum: TaskTeamMethod,
  })
  @IsString()
  @IsEnum(TaskTeamMethod)
  method: TaskTeamMethod;
}
