import { useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { FoodEntity, GameContextProps, PlayerEntity } from '../common/interfaces';
import { SocketMessage } from '../common/enums';
import { useSocket } from './useSocket';

export const useGameLogic = (): GameContextProps => {
  const router = useRouter();
  const socket = useSocket();

  const [player, setPlayer] = useState<PlayerEntity>(null);
  const [food, setFood] = useState<FoodEntity>(null);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      if (player?.matchId && socket) {
        socket.emit(SocketMessage.ON_KEY_PRESS, { directionKey: e.key, matchId: player.matchId });
      }
    },
    [player, socket],
  );

  const updateCtx = useCallback((data: Partial<PlayerEntity> & Partial<GameContextProps>) => {
    setFood(data.food);
    setPlayer({
      matchId: data.matchId,
      snake: data.snake,
      score: data.score,
    });
  }, []);

  const onBackClick = useCallback(() => {
    socket.disconnect();
    setPlayer(null);
    setFood(null);
    router.push('/');
  }, [router, socket]);

  return {
    player, food, handleKeyPress, updateCtx, onBackClick,
  };
};
