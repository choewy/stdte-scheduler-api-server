import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';

@Injectable()
export class TeamException {
  NotFoundTeam() {
    throw new NotFoundException({
      status: 404,
      message: '존재하지 않는 팀입니다.',
    });
  }

  AlreadyExistTeam() {
    throw new ConflictException({
      status: 409,
      message: '이미 존재하는 팀입니다.',
    });
  }

  AlreadyExistTeamName() {
    throw new ConflictException({
      status: 409,
      message: '이미 사용 중인 팀 이름입니다.',
    });
  }
}
