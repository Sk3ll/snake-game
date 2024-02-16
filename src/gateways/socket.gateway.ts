'use server';

import type { Socket, ServerOptions } from 'socket.io';
import { Server as SocketIoServer } from 'socket.io';
import { SocketMessage } from '../common/enums';
import { GameLogicService } from '../core/game/gameLogic.service';
import { logger } from '../common/utils';

export class SocketGateway extends SocketIoServer {
  gameLogicService: GameLogicService;

  constructor(config?: Partial<ServerOptions>) {
    super({ cors: { origin: '*' }, ...config });

    this.on(SocketMessage.CONNECT, this.handleConnect.bind(this));
    this.gameLogicService = new GameLogicService();
  }

  handleConnect(socket: Socket) {
    socket.setMaxListeners(1000);
    socket.on(SocketMessage.DISCONNECT, this.handleDisconnect.bind(this, socket));
    socket.on(SocketMessage.ON_KEY_PRESS, this.keyPress.bind(this, socket));
    socket.on(SocketMessage.INIT_GAME, this.initGame.bind(this, socket));
  }

  handleDisconnect() {
    logger.info('socket disconnect');
  }

  initGame(socket: Socket, username: string) {
    this.gameLogicService.initGame(socket, username);
  }

  keyPress(socket: Socket, data: { directionKey: string; matchId: string }) {
    this.gameLogicService.updateDirection(data);
  }
}
