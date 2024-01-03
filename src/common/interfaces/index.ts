// import { Direction } from '../enums';

export * from './socket.interface';

export interface BaseEntity {
    x: number;
    y: number;
}

export interface SnakeEntity extends BaseEntity {}
export interface FoodEntity extends BaseEntity {}

export interface PlayerEntity {
    matchId: string;
    // username: string;
    // direction: Direction;
    snake: SnakeEntity[];
    score: number;
}

export interface GameContextProps {
    player: PlayerEntity;
    food: FoodEntity;
    updateCtx: (data: Partial<GameContextProps>) => void;
    handleKeyPress: (e: KeyboardEvent) => void;
    onBackClick: () => void;
}
