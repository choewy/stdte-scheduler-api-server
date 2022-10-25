import { UserQuery } from '@/typeorm';
import { JwtService, JwtSignOptions } from '@nestjs/jwt';
import { WsException } from '@nestjs/websockets';
import { Socket } from 'socket.io';
import { Payload } from './types';

export const validateConnection = (
  socket: Socket,
  jwtService: JwtService,
  config: JwtSignOptions,
) => {
  const token = (socket.handshake.auth.bearer || 'Bearer ').replace(
    'Bearer ',
    '',
  );

  try {
    jwtService.verify<Payload>(token, config);
    return true;
  } catch (e) {
    return false;
  }
};

export const validateSocketAuth = async (
  socket: Socket,
  userQuery: UserQuery,
  jwtService: JwtService,
  config: JwtSignOptions,
) => {
  const token = (socket.handshake.auth.bearer || 'Bearer ').replace(
    'Bearer ',
    '',
  );

  try {
    const payload = jwtService.verify<Payload>(token, config);
    const user = await userQuery.selectUserExecute({
      uid: payload.uid,
    });

    if (!user) {
      throw new WsException({
        status: 401,
        error: 'NotFound',
        message: '사용자를 찾을 수 없습니다.',
      });
    }

    socket['user'] = user;
    return true;
  } catch (e) {
    switch (e.message) {
      case 'jwt expired':
        throw new WsException({
          status: 401,
          error: 'BadRequest',
          message: '토큰이 만료되었습니다.',
        });

      default:
        throw new WsException({
          status: 401,
          error: 'Unauthorized',
          message: '인증에 실패하였습니다.',
        });
    }
  }
};
