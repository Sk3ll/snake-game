import React, { createContext, PropsWithChildren } from 'react';
import { useGameLogic } from '../hooks/useGameLogic';
import { GameContextProps } from '../common/interfaces';

export const GameContext = createContext<GameContextProps | null>(null);

export const GameProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const gameLogic = useGameLogic();

  return (
    <GameContext.Provider
      value={gameLogic ?? null}
    >
      {children}
    </GameContext.Provider>
  );
};
