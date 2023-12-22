'use client';

import React from 'react';
import { useGameContext } from '../hooks/useGameContext';

export const Score: React.FC = () => {
  const { score } = useGameContext();

  return (
    <span className="text-3xl">
      {`Score: ${score}`}
    </span>
  );
};
