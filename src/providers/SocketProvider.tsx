import React, {
  createContext,
  useEffect,
  useMemo,
  useRef,
} from 'react';
import { io, Socket } from 'socket.io-client';

import { BASE_SOCKET_CONFIG, SOCKET_API_URL } from '../common/constants';
import { SocketMessage } from '../common/enums';
import type {
  SocketOnParamsType,
  SocketOffParamsType,
  SocketEmitParamsType,
  SocketContextProps,
} from '../common/interfaces';

export const SocketContext = createContext<SocketContextProps | null>(null);

export const SocketProvider = ({ ...props }) => {
  const socketRef = useRef<Socket | null>(null);
  const shouldSocketDisconnect = useRef(false);
  const unInvokedEmitList = useRef([]);

  useEffect(() => () => {
    if (socketRef.current && shouldSocketDisconnect.current) {
      socketRef.current.disconnect();
    }

    if (shouldSocketDisconnect.current) {
      shouldSocketDisconnect.current = true;
    }
  }, []);

  useEffect(() => {
    window.addEventListener('beforeunload', socketRef.current?.disconnect);
    return () => {
      window.removeEventListener('beforeunload', socketRef.current?.disconnect);
    };
  }, []);

  const ctx = useMemo(() => ({
    init: () => {
      if (socketRef.current) {
        return Promise.resolve();
      }

      // eslint-disable-next-line no-async-promise-executor
      return new Promise<void>(async (resolve, reject) => {
        const response = await fetch(SOCKET_API_URL).then((r) => r.json()).catch(reject);
        const socket = io(response.socket, BASE_SOCKET_CONFIG);
        socketRef.current = socket;

        socket.once(SocketMessage.CONNECT, () => {
          unInvokedEmitList.current?.forEach((args: SocketEmitParamsType) => {
            socketRef.current.emit(...args);
          });
          unInvokedEmitList.current = [];
        });
        socket.on(SocketMessage.CONNECT, () => {
          resolve();
        });
        socket.on(SocketMessage.CONNECT_ERROR, (err) => {
          reject(err);
        });
        socket.on(SocketMessage.DISCONNECT, (reason) => {
          if (reason === 'io server disconnect' && socketRef.current) {
            socketRef.current = null;
          }
        });
      });
    },
    on: (...args: SocketOnParamsType) => {
      if (socketRef.current) {
        socketRef.current.on(...args);
      }
    },
    off: (...args: SocketOffParamsType) => {
      if (socketRef.current) {
        socketRef.current.off(...args);
      }
    },
    emit: (...args: SocketEmitParamsType) => {
      if (socketRef.current) {
        socketRef.current.emit(...args);
      } else if (unInvokedEmitList.current) {
        unInvokedEmitList.current.push(args);
      }
    },
    disconnect: () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
    },
    isConnected: () => !!socketRef.current,
  }), []);

  return <SocketContext.Provider value={ctx} {...props} />;
};
