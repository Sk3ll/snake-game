import { useContext } from 'react';
import { SocketContext } from '../providers/SocketProvider';

export function useSocket() {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error('SocketContext must be used within a SocketProvider');
  }
  return context;
}
