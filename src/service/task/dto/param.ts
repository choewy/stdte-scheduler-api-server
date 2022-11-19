import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class GetTaskParam {
  @ApiProperty({
    description: '사업 PK',
  })
  @IsNotEmpty()
  @IsNumber()
  taskId: number;
}
