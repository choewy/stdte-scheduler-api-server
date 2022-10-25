import { SocketErrorType } from './types';

export interface SocketEventListener {
  (...args: any[]): void;
}

export interface SocketExceptionHandler {
  (error: SocketErrorType): void;
}

export interface SocketAuthorizeHandler {
  (user: { uid: number; name: string; email: string }): void;
}

export interface SocketInterface {
  connect: (...args: any[]) => void;
  clean: (...callbacks: Array<SocketEventListener>) => () => void;
  exception: (callback: SocketExceptionHandler) => void;
  on: (event: string, callback: SocketEventListener) => void;
  emit: (event: string, ...args: any[]) => void;
}
