import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets';
import { UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { Socket } from 'socket.io';
import { AuthGuard } from './auth.guard';
import { classConstructor, WSModuleGateway } from '@/core';
import { AuthTokenRvo, AuthUserRvo } from './rvo';

@WSModuleGateway()
export class AuthGateway {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @SubscribeMessage('authorize')
  async authorize(@ConnectedSocket() socket: Socket): Promise<AuthUserRvo> {
    const user = await socket['user'];
    return classConstructor(new AuthUserRvo(), {
      uid: user.uid,
      name: user.name,
      email: user.email,
    });
  }

  @SubscribeMessage('authorize:refresh')
  async authorizeRefresh(@ConnectedSocket() socket: Socket) {
    console.log(socket.handshake.auth.refresh);
  }

  @SubscribeMessage('auth:signup')
  async signUp(@MessageBody() body: SignUpDto): Promise<AuthTokenRvo> {
    return await this.authService.signUpUser(body);
  }

  @SubscribeMessage('auth:signin:email')
  async signInWithEmail(@MessageBody() body: SignInDto): Promise<AuthTokenRvo> {
    return await this.authService.signInWithEmail(body);
  }
}
