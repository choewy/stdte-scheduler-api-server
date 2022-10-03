import {
  SwaggerAuthGuard,
  SwaggerBody,
  SwaggerResponse,
  SwaggerRouter,
  SwaggerRouterFunction,
  SwaggerSummary,
} from '@/core/swagger';
import { applyDecorators } from '@nestjs/common';
import { CreateIndividualChatRoomDto, CreateGroupChatRoomDto } from './dto';

export class ChatRouter {
  private static readonly CommonSummary = (
    summary: string,
    description = '`every`',
  ) => {
    return SwaggerSummary(summary, description);
  };

  private static CommonGaurds = () => {
    return applyDecorators(SwaggerAuthGuard());
  };

  public static CreateIndividualChatRoom: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      this.CommonSummary('1:1 채팅방 생성 API'),
      this.CommonGaurds(),
      SwaggerBody({
        formats: ['xwwwForm'],
        type: CreateIndividualChatRoomDto,
      }),
      SwaggerResponse({
        status: 201,
        type: 'number',
      }),
    );
  };

  public static CreateGroupChatRoom: SwaggerRouterFunction = (options) => {
    return SwaggerRouter(
      options,
      this.CommonSummary('그룹 채팅방 생성 API'),
      this.CommonGaurds(),
      SwaggerBody({
        formats: ['xwwwForm'],
        type: CreateGroupChatRoomDto,
      }),
      SwaggerResponse({
        status: 201,
        type: 'number',
      }),
    );
  };
}
