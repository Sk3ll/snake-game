import React from 'react';
import './App.css';
import { GameManager } from './components/GameManager.tsx';
import { GameProvider } from './providers/GameProvider.tsx';

const App = () => (
  <GameProvider>
    <GameManager />
  </GameProvider>
);

export default App;
