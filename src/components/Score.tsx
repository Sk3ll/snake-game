'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import { useGameContext } from '../hooks/useGameContext';

export const Score: React.FC = () => {
  const searchParams = useSearchParams();
  const { players } = useGameContext();
  const defaultScore = 0;
  const player = players?.find(({ matchId }) => matchId === searchParams.get('user'));

  return (
    <span className="text-3xl">
      {`Score: ${player?.score ?? defaultScore}`}
    </span>
  );
};
