import { BadRequestException, NotFoundException } from '@nestjs/common';

export const NotFoundTeamException = new NotFoundException({
  status: 404,
  message: '존재하지 않는 팀입니다.',
});

export const AlreadyUsedTeamNameException = new BadRequestException({
  status: 400,
  message: '이미 사용 중인 팀 이름입니다.',
});
