'use server';

import type { NextApiRequest } from 'next';
import type { SocketResponse } from '../../common/interfaces';
import { SocketGateway } from '../../gateways/socket.gateway';
import { BASE_SOCKET_CONFIG } from '../../common/constants';
import { catchWrapper } from '../../common/utils';

const defaultPort = 3005;
const PORT = (process.env.PORT ? Number(process.env.PORT) : defaultPort) + 1;

export default catchWrapper(async (_: NextApiRequest, res: SocketResponse) => {
  if (res.socket.server.io) {
    res.status(200).json({ success: true, message: 'Socket is already running', socket: `:${PORT}` });
    return;
  }

  console.log('Starting Socket.IO server on port:', PORT);

  res.socket.server.io = new SocketGateway(BASE_SOCKET_CONFIG).listen(PORT);

  res.status(201).json({ success: true, message: 'Socket is started', socket: `:${PORT}` });
});
