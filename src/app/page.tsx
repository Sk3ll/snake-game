'use client';

import React from 'react';
import { GameProvider } from '../providers/GameProvider';
import { GameManager } from '../components/GameManager';

const App: React.FC = () => (
  <GameProvider>
    <GameManager />
  </GameProvider>
);

export default App;
