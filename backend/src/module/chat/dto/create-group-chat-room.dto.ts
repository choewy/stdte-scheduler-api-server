import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateGroupChatRoomDto {
  @ApiProperty({ type: 'number', isArray: true })
  @IsNotEmpty()
  @IsArray()
  userIds: number[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  name: string;
}
