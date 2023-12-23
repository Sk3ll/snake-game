'use client';

import React from 'react';
import { GameProvider } from '../providers/GameProvider';
import { GameManager } from '../components/GameManager';
import { SocketProvider } from '../providers/SocketProvider';
import { Compose } from '../components/Compose';

const providers = [SocketProvider, GameProvider];

const App: React.FC = () => (
  <Compose providers={providers}>
    <GameManager />
  </Compose>
);

export default App;
