import { useCallback, useState } from 'react';
import { FoodEntity, GameContextProps, SnakeEntity } from '../common/interfaces';
import { Direction } from '../common/enums/direction';
import {
  generateNewFood,
  generateNewSnake,
  getSize,
  isCrossedCoords,
  isCrossedEntities,
  randomDirection,
} from '../common/utils';

export const useGameLogic = (): GameContextProps => {
  const defaultSpeed = 250;
  const defaultScore = 0;

  const [snake, setSnake] = useState<SnakeEntity[]>(generateNewSnake());
  const [food, setFood] = useState<FoodEntity>(generateNewFood(snake));
  const [direction, setDirection] = useState<Direction>(randomDirection());
  const [score, setScore] = useState<number>(defaultScore);
  const [speed, setSpeed] = useState<number>(defaultSpeed);

  const onGameOver = useCallback(() => {
    // eslint-disable-next-line no-alert
    alert('Game Over!');
    setSnake(generateNewSnake());
    setFood(generateNewFood(snake));
    setDirection(randomDirection());
    setScore(defaultScore);
    setSpeed(defaultSpeed);
  }, [snake]);

  const moveSnake = useCallback((intervalId: NodeJS.Timeout) => {
    const newSnake = [...snake];
    const head = { ...newSnake[0] };

    const directionHandlers: { [key in Direction]: () => void } = {
      [Direction.UP]: () => (head.y = (head.y - 1 + getSize()) % (getSize())),
      [Direction.DOWN]: () => (head.y = (head.y + 1) % (getSize())),
      [Direction.LEFT]: () => (head.x = (head.x - 1 + getSize()) % (getSize())),
      [Direction.RIGHT]: () => (head.x = (head.x + 1) % (getSize())),
    };
    directionHandlers[direction]();

    // Check handle with snake body
    if (isCrossedEntities(newSnake.slice(1), head)) {
      onGameOver();
      clearInterval(intervalId);
      return;
    }

    newSnake.unshift(head);

    if (isCrossedCoords(head, food)) {
      // Snake ate the food, generate new food
      setFood(generateNewFood(snake));

      // Increase score
      setScore(score + 50);

      // Increase speed every 200 points, with a maximum speed of 200
      if (score % 200 === 0 && speed > 25) {
        setSpeed(speed - 25);
      }
    } else {
      // Remove the last part of the snake if it didn't eat the food
      newSnake.pop();
    }

    setSnake(newSnake);
  }, [snake, direction, onGameOver, food, score, speed]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      const directionMap: { [key: string]: Direction } = {
        ArrowUp: Direction.UP,
        ArrowDown: Direction.DOWN,
        ArrowLeft: Direction.LEFT,
        ArrowRight: Direction.RIGHT,
      };

      const oppositeDirection: Record<string, Direction> = {
        ArrowUp: Direction.DOWN,
        ArrowDown: Direction.UP,
        ArrowLeft: Direction.RIGHT,
        ArrowRight: Direction.LEFT,
      };

      const checkOppositeDirection = snake.length !== 1 && oppositeDirection[e.key] !== direction;

      if ((directionMap[e.key] && snake.length === 1) || checkOppositeDirection) {
        setDirection(directionMap[e.key]);
      }
    },
    [setDirection, direction, snake.length],
  );

  return {
    snake, direction, food, score, speed, moveSnake, handleKeyPress, setDirection,
  };
};
