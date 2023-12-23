import { CANVAS_SIZE, CELL_SIZE } from '../constants';
import { Direction } from '../enums';

export const getSize = () => CANVAS_SIZE / CELL_SIZE;

export const randomPosition = (): number => Math.floor(Math.random() * getSize());

export const randomDirection = (): Direction => {
  const keys = Object.keys(Direction);
  // eslint-disable-next-line no-bitwise
  return Direction[keys[keys.length * Math.random() << 0]];
};
