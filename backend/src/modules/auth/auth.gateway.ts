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
import { User } from '@/typeorm';
import { AuthRoleRvo } from './rvo/auth-role.rvo';

@WSModuleGateway()
export class AuthGateway {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @SubscribeMessage('authorize')
  async authorize(@ConnectedSocket() socket: Socket): Promise<AuthUserRvo> {
    const user = (await socket['user']) as User;

    const role = new AuthRoleRvo();
    user.roles.forEach((row) => {
      Object.entries(row).forEach(([key, value]) => {
        role[key] = role[key] || value;
      });
    });

    return classConstructor(new AuthUserRvo(), {
      uid: user.uid,
      name: user.name,
      email: user.email,
      role,
    });
  }

  @SubscribeMessage('authorize:refresh')
  async authorizeRefresh(@ConnectedSocket() socket: Socket) {
    console.log(socket.handshake.auth.refresh);
  }

  @SubscribeMessage('authorize:signup')
  async signUp(@MessageBody() body: SignUpDto): Promise<AuthTokenRvo> {
    return await this.authService.signUpUser(body);
  }

  @SubscribeMessage('authorize:signin:email')
  async signInWithEmail(@MessageBody() body: SignInDto): Promise<AuthTokenRvo> {
    return await this.authService.signInWithEmail(body);
  }
}
