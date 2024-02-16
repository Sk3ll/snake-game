import { useCallback, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FoodEntity, GameContextProps, PlayerEntity } from '../common/interfaces';
import { SocketMessage } from '../common/enums';
import { useSocket } from './useSocket';

export const useGameLogic = (): GameContextProps => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const socket = useSocket();

  const [players, setPlayers] = useState<PlayerEntity[]>([]);
  const [food, setFood] = useState<FoodEntity>(null);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (searchParams.get('user') && socket) {
        socket.emit(SocketMessage.ON_KEY_PRESS, { directionKey: e.key, matchId: searchParams.get('user') });
      }
    },
    [searchParams, socket],
  );

  const updateCtx = useCallback((data: Pick<GameContextProps, 'food' | 'players'>) => {
    setFood(data.food);
    setPlayers(data.players);
  }, []);

  const onBackClick = useCallback(() => {
    socket.disconnect();
    setPlayers(null);
    setFood(null);
    router.push('/');
  }, [router, socket]);

  return {
    players, food, handleKeyPress, updateCtx, onBackClick,
  };
};
