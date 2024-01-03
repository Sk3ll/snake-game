import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useGameContext } from './useGameContext';
import { useSocket } from './useSocket';
import { SocketMessage } from '../common/enums';

export const useSocketListeners = () => {
  let called = false;
  const socket = useSocket();
  const { updateCtx } = useGameContext();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!called) {
      socket.init()
        .then(() => {
          socket.emit(SocketMessage.INIT_GAME, searchParams.get('user'));
          socket.on(SocketMessage.UPDATE_GAME, updateCtx);

          return () => {
            socket.off(SocketMessage.UPDATE_GAME, updateCtx);
          };
        });
      // eslint-disable-next-line react-hooks/exhaustive-deps
      called = true;
    }
  }, [socket]);
};
