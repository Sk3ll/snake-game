import { Direction } from '../enums/direction.ts';

export interface SnakePart {
    x: number;
    y: number;
}

export interface GameContextProps {
    snake: SnakePart[];
    direction: Direction;
    food: SnakePart;
    score: number;
    speed: number;
    moveSnake: () => void;
    handleKeyPress: (e: KeyboardEvent) => void;
}
