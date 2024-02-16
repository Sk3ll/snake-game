import { Direction } from '../enums';

export * from './socket.interface';

export interface BaseEntity {
    x: number;
    y: number;
}

export interface SnakeEntity extends BaseEntity {}
export interface FoodEntity extends BaseEntity {}

export interface PlayerEntity {
    matchId: string;
    coords: SnakeEntity[];
    direction: Direction;
    speed: number;
    score: number;
}

export interface GameContextProps {
    players: PlayerEntity[];
    food: FoodEntity;
    updateCtx: (data: Partial<GameContextProps>) => void;
    handleKeyPress: (e: KeyboardEvent) => void;
    onBackClick: () => void;
}
