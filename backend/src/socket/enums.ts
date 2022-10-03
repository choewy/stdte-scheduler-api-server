export enum SocketEmitEventType {
  Init = 'init',
  Notice = 'notice',
  MessageRooms = 'message-rooms',
  SendMessage = 'message::send',
}

export enum SocketSubEvent {
  Sign = 'sign',
  SignOut = 'signout',
  MessageRooms = 'message-rooms',
  ReceiveMessage = 'message::receive',
}
