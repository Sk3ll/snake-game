import { Direction } from '../enums/direction.ts';

export interface BaseCoords {
    x: number;
    y: number;
}

export interface SnakePart extends BaseCoords {}
export interface FoodPart extends BaseCoords {}

export interface GameContextProps {
    snake: SnakePart[];
    direction: Direction;
    food: FoodPart;
    score: number;
    speed: number;
    moveSnake: () => void;
    handleKeyPress: (e: KeyboardEvent) => void;
}
