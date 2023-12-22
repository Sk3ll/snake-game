import { CANVAS_SIZE, CELL_SIZE } from '../constants';
import { FoodEntity, SnakeEntity, BaseEntity } from '../interfaces';
import { Color } from '../enums/color';
import { Direction } from '../enums/direction';

export const getSize = () => CANVAS_SIZE / CELL_SIZE;

export const randomPosition = (): number => Math.floor(Math.random() * getSize());

export const randomDirection = (): Direction => {
  const keys = Object.keys(Direction);
  // eslint-disable-next-line no-bitwise
  return Direction[keys[keys.length * Math.random() << 0]];
};

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

export const drawEntity = (ctx: CanvasRenderingContext2D, entity: BaseEntity, color: Color) => {
  ctx.fillStyle = color;
  ctx.fillRect(entity.x * CELL_SIZE + 1, entity.y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
};
