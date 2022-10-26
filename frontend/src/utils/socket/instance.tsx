import { io } from 'socket.io-client';
import { socketConfig } from '@/core';
import {
  SocketAuthorizeHandler,
  SocketEventListener,
  SocketExceptionHandler,
  SocketInterface,
} from './interfaces';
import { CookieInstance } from '../cookie';
import { TokenType } from '@/modules';

const { uri, path } = socketConfig();

const socket = io(uri, {
  path,
  transports: ['websocket'],
  autoConnect: false,
});

export class SocketInstance extends CookieInstance implements SocketInterface {
  connect() {
    socket.auth = {
      bearer: this.getBearerAuth(),
    };

    socket.connect();
  }

  authorize(authorizeHandler: SocketAuthorizeHandler) {
    socket.emit('authorize', authorizeHandler);
  }

  refresh() {
    socket.auth = {
      ...socket.auth,
      refresh: this.getRefreshToken(),
    };

    socket.emit('authorize:refresh', (token: TokenType) => {
      this.setTokens(token);
    });
  }

  emit(event: string, ...args: any[]) {
    socket.emit(event, ...args);
  }

  exception(exceptionHandler: SocketExceptionHandler) {
    socket.on('exception', exceptionHandler);
  }

  on(event: string, callback: SocketEventListener) {
    socket.on(event, (...args: any[]) => {
      callback(...args);
    });
  }

  clean(...callbacks: Array<SocketEventListener>) {
    return () => {
      socket.removeAllListeners();
      socket.disconnect();
      callbacks.forEach((callback) => callback());
    };
  }
}
