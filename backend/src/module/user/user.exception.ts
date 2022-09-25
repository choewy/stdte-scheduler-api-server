import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UserException {
  NotFoundUser() {
    throw new NotFoundException({
      status: 404,
      message: '존재하지 않는 사용자입니다.',
    });
  }

  AlreadyExistUsername() {
    throw new ConflictException({
      status: 409,
      message: '이미 사용 중인 아이디입니다.',
    });
  }

  AlreadyExistEmail() {
    throw new ConflictException({
      status: 409,
      message: '이미 사용 중인 이메일입니다.',
    });
  }
}
