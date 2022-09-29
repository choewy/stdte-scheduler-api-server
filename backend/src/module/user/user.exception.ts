import { BadRequestException, NotFoundException } from '@nestjs/common';

export const NotFoundUserException = new NotFoundException({
  status: 404,
  message: '존재하지 않는 사용자입니다.',
});

export const AlreadyUsedEmailException = new BadRequestException({
  status: 400,
  message: '이미 사용 중인 이메일입니다.',
});

export const AlreadyUsedUsernameException = new BadRequestException({
  status: 400,
  message: '이미 사용 중인 아이디입니다.',
});
