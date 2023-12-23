'use server';

import type { Socket, ServerOptions } from 'socket.io';
import { Server as SocketIoServer } from 'socket.io';
import { SocketMessage } from '../common/enums';

export class SocketGateway extends SocketIoServer {
  constructor(config?: Partial<ServerOptions>) {
    super({ cors: { origin: '*' }, ...config });

    this.on(SocketMessage.CONNECT, this.handleConnect.bind(this));
  }

  handleConnect(socket: Socket) {
    socket.setMaxListeners(1000);
    console.log('socket connect', socket.id);

    socket.on(SocketMessage.DISCONNECT, this.handleDisconnect.bind(this));
  }

  handleDisconnect(socket: Socket) {
    console.log('socket disconnect');
  }
}
