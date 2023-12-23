import { Direction } from '../enums';

export * from './socket.interface';

export interface BaseEntity {
    x: number;
    y: number;
}

export interface SnakeEntity extends BaseEntity {}
export interface FoodEntity extends BaseEntity {}

export interface GameContextProps {
    snake: SnakeEntity[];
    direction: Direction;
    food: FoodEntity;
    score: number;
    speed: number;
    moveSnake: (intervalId: NodeJS.Timeout) => void;
    handleKeyPress: (e: KeyboardEvent) => void;
    setDirection: (dir: Direction) => void;
}
