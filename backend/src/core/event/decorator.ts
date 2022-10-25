import {
  ClassInterceptor,
  LogInterceptor,
  WsExceptionFilter,
  WsValidationPipe,
} from '@/app';
import { AuthGuard } from '@/modules/auth';
import { AuthGateway } from '@/modules/auth/auth.gateway';
import {
  applyDecorators,
  UseFilters,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { GatewayMetadata, WebSocketGateway } from '@nestjs/websockets';

export const WSRootGateway = (options?: GatewayMetadata) => {
  return applyDecorators(WebSocketGateway(options));
};

export const WSModuleGateway = (options?: GatewayMetadata) => {
  return applyDecorators(
    UsePipes(WsValidationPipe),
    UseFilters(WsExceptionFilter),
    UseInterceptors(ClassInterceptor, LogInterceptor),
    WebSocketGateway(options),
  );
};
