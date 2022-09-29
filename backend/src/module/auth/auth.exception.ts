import { Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class AuthException {
  IncorrectAccount() {
    throw new BadRequestException({
      status: 400,
      message: '사용자 계정과 비밀번호를 다시 확인하세요.',
    });
  }

  IncorrectPassword() {
    throw new BadRequestException({
      status: 400,
      message: '비밀번호가 일치하지 않습니다',
    });
  }

  AlreadyExistUsername() {
    throw new BadRequestException({
      status: 400,
      message: '이미 사용 중인 아이디입니다.',
    });
  }

  AlreadyExistEmail() {
    throw new BadRequestException({
      status: 400,
      message: '이미 사용 중인 이메일입니다.',
    });
  }
}

export const IncorrectAccountOrPasswordException = new BadRequestException({
  status: 400,
  message: '아이디 또는 비밀번호를 다시 확인하세요.',
});

export const IncorrectConfirmPasswordException = new BadRequestException({
  status: 400,
  message: '비밀번호가 일치하지 않습니다.',
});

export const AlreadyUsedUsernameOrEmailException = new BadRequestException({
  status: 400,
  message: '아이디 또는 이메일이 이미 사용 중입니다.',
});
