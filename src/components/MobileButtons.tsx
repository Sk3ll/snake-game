'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { Direction, SocketMessage } from '../common/enums';
import { Button } from './Button';
import { DIRECTION_KEYS } from '../common/constants';
import { useSocket } from '../hooks/useSocket';
import { swap } from '../common/utils';
import { useGameContext } from '../hooks/useGameContext';

export const MobileButtons = () => {
  const socket = useSocket();
  // const { player } = useGameContext();
  const [isMobile, setMobile] = useState<RegExpMatchArray>(null);

  // const onChangeDirectionClick = useCallback((direction: Direction) => {
  //   const swappedDirections: Record<Direction, string> = swap(DIRECTION_KEYS);
  //   socket.emit(SocketMessage.ON_KEY_PRESS, { directionKey: swappedDirections[direction], matchId: player.matchId });
  // }, [player, socket]);

  useEffect(() => () => {
    setMobile(window.navigator.userAgent.match(/iPhone|Android|iPad/i));
  }, []);

  return isMobile && (
  <div className="grid grid-cols-3 grid-rows-2 gap-4">
    {Object.values(Direction).map((direction: Direction) => (
      <Button
        key={direction}
        className={`${direction === Direction.UP ? 'col-start-2' : 'row-start-2'}`}
        onClick={() => {}}
        // onClick={() => onChangeDirectionClick(direction)}
      >
        {direction}
      </Button>
    ))}
  </div>
  );
};
