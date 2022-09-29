import { NotFoundException, BadRequestException } from '@nestjs/common';

export const CanNotAccessRoleException = new BadRequestException({
  status: 400,
  message: '수정/삭제가 불가능한 역할입니다.',
});

export const AlreadyUsedRoleNameException = new BadRequestException({
  status: 400,
  message: '이미 사용 중인 역할 이름입니다.',
});

export const NotFoundRoleException = new NotFoundException({
  status: 404,
  message: '존재하지 않는 역할입니다.',
});
