import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class UserException {
  NotFoundUser() {
    return new NotFoundException({
      status: 404,
      message: '존재하지 않는 사용자입니다.',
    });
  }

  AlreadyExistUser() {
    return new ConflictException({
      status: 409,
      message: '이미 존재하는 사용자입니다.',
    });
  }
}
