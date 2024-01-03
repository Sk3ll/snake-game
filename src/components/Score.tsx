'use client';

import React from 'react';
import { useGameContext } from '../hooks/useGameContext';

export const Score: React.FC = () => {
  const { player } = useGameContext();
  const defaultScore = 0;

  return (
    <span className="text-3xl">
      {`Score: ${player?.score ?? defaultScore}`}
    </span>
  );
};
