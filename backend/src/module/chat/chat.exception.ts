import { NotFoundException } from '@nestjs/common';

export const NotFoundUserException = new NotFoundException({
  status: 404,
  message: '사용자를 찾을 수 없습니다.',
});
