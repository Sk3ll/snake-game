import { Direction } from '../enums';

export const BUY_ME_COFFE_URL = 'https://www.buymeacoffee.com/sk3llyarm';
export const CANVAS_SIZE = 400;
export const CELL_SIZE = 20;

export const SOCKET_API_URL = '/api/socket';

export const BASE_SOCKET_CONFIG = {
  path: SOCKET_API_URL,
  addTrailingSlash: false,
};

export const DIRECTION_KEYS: Record<string, Direction> = {
  ArrowUp: Direction.UP,
  ArrowDown: Direction.DOWN,
  ArrowLeft: Direction.LEFT,
  ArrowRight: Direction.RIGHT,
};

export const KEYDOWN_EVENT = 'keydown';
