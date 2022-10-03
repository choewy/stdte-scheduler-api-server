import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class CreateIndividualChatRoomDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
