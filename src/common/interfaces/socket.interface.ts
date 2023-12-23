import type { Server as HTTPServer } from 'node:http';
import type { Socket as NetSocket } from 'node:net';
import type { Server as IOServer } from 'socket.io';
import type { NextApiResponse } from 'next';
import type { Socket as SocketClient } from 'socket.io-client';

export type SocketOnParamsType = Parameters<SocketClient['on']>;
export type SocketOffParamsType = Parameters<SocketClient['off']>;
export type SocketEmitParamsType = Parameters<SocketClient['emit']>;

export interface SocketServer extends HTTPServer {
io?: IOServer;
}

export interface SocketWithIO extends NetSocket {
    server: SocketServer;
}

export interface SocketResponse extends NextApiResponse {
    socket: SocketWithIO;
}

export interface SocketContextProps {
    init: () => Promise<void>;
    disconnect: () => void;
    on: (...arg: SocketOnParamsType) => void;
    off: (...arg: SocketOffParamsType) => void;
    emit: (...arg: SocketEmitParamsType) => void;
    isConnected: () => boolean;
}
