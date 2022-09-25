import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';

@Injectable()
export class AuthException {
  InvalidAccount() {
    throw new BadRequestException({
      status: 400,
      message: '아이디 또는 이메일을 입력하세요.',
    });
  }

  IncorrectAccount() {
    throw new UnauthorizedException({
      status: 401,
      message: '사용자 계정과 비밀번호를 다시 확인하세요.',
    });
  }

  IncorrectPassword() {
    throw new UnauthorizedException({
      status: 400,
      message: '비밀번호가 일치하지 않습니다',
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
