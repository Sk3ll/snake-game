import { CANVAS_SIZE, CELL_SIZE } from '../constants';

export const getSize = () => CANVAS_SIZE / CELL_SIZE;

export const randomPosition = (): number => Math.floor(Math.random() * getSize());
