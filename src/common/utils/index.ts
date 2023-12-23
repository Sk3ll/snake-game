import type { FoodEntity, SnakeEntity } from '../interfaces';
import { randomPosition } from './calculations';

export * from './calculations';
export * from './drawEntity';
export * from './catchWrapper';
export * from './errorHandler';

export const isCrossedCoords = (snake: SnakeEntity, food: FoodEntity) => snake.x === food.x && snake.y === food.y;

export const isCrossedEntities = (snake: SnakeEntity[], food: FoodEntity): boolean => {
  const condition = snake.some((s) => isCrossedCoords(s, food));
  // const condition = snake.some((s) => food.some((f) => isCrossedCoords(s, f)));
  return condition;
};

export const generateNewFood = (snakeEntity: SnakeEntity[]): FoodEntity => {
  let newFood: FoodEntity;
  do {
    newFood = {
      x: randomPosition(),
      y: randomPosition(),
    };
  } while (isCrossedEntities(snakeEntity, newFood));

  return newFood;
};

export const generateNewSnake = (): SnakeEntity[] => [{
  x: randomPosition(),
  y: randomPosition(),
}];
