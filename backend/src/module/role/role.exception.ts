import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class RoleException {
  NotFoundRole() {
    throw new NotFoundException({
      status: 404,
      message: '존재하지 않는 역할입니다.',
    });
  }

  AlreadyExistRole() {
    throw new ConflictException({
      status: 409,
      message: '이미 존재하는 역할입니다.',
    });
  }

  AlreadyExistRoleName() {
    throw new ConflictException({
      status: 409,
      message: '이미 존재하는 역할 이름입니다.',
    });
  }
}
