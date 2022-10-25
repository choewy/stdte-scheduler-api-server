import { UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
} from '@nestjs/websockets';
import { AuthService } from './auth.service';
import { SignInDto, SignUpDto } from './dto';
import { Socket } from 'socket.io';
import { AuthGuard } from './auth.guard';
import { classConstructor, WSModuleGateway } from '@/core';
import { AuthRvo } from './rvo';

@WSModuleGateway()
export class AuthGateway {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @SubscribeMessage('authorize')
  async authorize(@ConnectedSocket() socket: Socket) {
    const user = socket['user'];
    return classConstructor(new AuthRvo(), {
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
  async signUp(@MessageBody() body: SignUpDto) {
    return await this.authService.signUpUser(body);
  }

  @SubscribeMessage('auth:signin-email')
  async signInWithEmail(@MessageBody() body: SignInDto) {
    return await this.authService.signInWithEmail(body);
  }
}
