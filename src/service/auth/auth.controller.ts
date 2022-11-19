import { AuthGuard, Client } from '@/core/common';
import { ApiRequestType, ApiResponseType } from '@/core/swagger';
import { User } from '@/core/typeorm/entities';
import {
  BadRequestException,
  Body,
  Controller,
  ForbiddenException,
  Get,
  HttpStatus,
  Patch,
  Post,
  UnauthorizedException,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import {
  AuthResponse,
  SignInBody,
  SignResponse,
  SignUpBody,
  UpdatePasswordBody,
} from './dto';
import {
  AlreadyExistEmailException,
  CannotChangeCurrentPasswordException,
  IncorrectPasswordException,
} from './exceptions';

@ApiTags('인증')
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}

  @Get()
  @ApiRequestType({
    summary: '인증',
    guards: [AuthGuard],
  })
  @ApiResponseType({
    type: AuthResponse,
    errors: [UnauthorizedException, ForbiddenException],
  })
  async auth(@Client() user: User): Promise<AuthResponse> {
    return Object.assign(new AuthResponse(), {
      id: user.id,
      name: user.name,
      email: user.email,
    });
  }

  @Post('signin')
  @ApiRequestType({
    summary: '로그인',
    consume: 'x-www-form',
  })
  @ApiResponseType({
    status: HttpStatus.OK,
    type: SignResponse,
    errors: [BadRequestException, AlreadyExistEmailException],
  })
  async signIn(@Body() body: SignInBody): Promise<SignResponse> {
    return this.service.signIn(body);
  }

  @Post('signup')
  @ApiRequestType({
    summary: '회원가입',
    consume: 'x-www-form',
  })
  @ApiResponseType({
    type: SignResponse,
    errors: [
      BadRequestException,
      IncorrectPasswordException,
      AlreadyExistEmailException,
    ],
  })
  async signUp(@Body() body: SignUpBody): Promise<SignResponse> {
    return this.service.signUp(body);
  }

  @Patch('password')
  @ApiRequestType({
    summary: '비밀번호 변경',
    guards: [AuthGuard],
    consume: 'x-www-form',
  })
  @ApiResponseType({
    status: HttpStatus.NO_CONTENT,
    errors: [
      BadRequestException,
      UnauthorizedException,
      IncorrectPasswordException,
      CannotChangeCurrentPasswordException,
    ],
  })
  async updatePassrod(
    @Client() user: User,
    @Body() body: UpdatePasswordBody,
  ): Promise<void> {
    return this.service.updatePassword(user, body);
  }
}
