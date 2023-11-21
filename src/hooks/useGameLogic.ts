import { useCallback, useState } from 'react';
import { SnakePart } from '../common/interfaces';
import { Direction } from '../common/enums/direction.ts';
import { getSize, randomPosition } from '../common/utils';

export const useGameLogic = () => {
  const [snake, setSnake] = useState<SnakePart[]>([{ x: 10, y: 10 }]);
  const [direction, setDirection] = useState<Direction>(Direction.RIGHT);
  const [food, setFood] = useState<SnakePart>({ x: 5, y: 5 });
  const [score, setScore] = useState<number>(0);
  const [speed, setSpeed] = useState<number>(250);

  const moveSnake = useCallback(() => {
    const generateNewFood = () => {
      let newFood: SnakePart;
      do {
        newFood = {
          x: randomPosition(),
          y: randomPosition(),
        };
        // Check would food be snake part
        // eslint-disable-next-line no-loop-func
      } while (snake.some((part) => part.x === newFood.x && part.y === newFood.y));

      setFood(newFood);
    };

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
    if (newSnake.slice(1).some((part) => part.x === head.x && part.y === head.y)) {
      // eslint-disable-next-line no-alert
      alert('Game Over!');
      window.location.reload(); // Reboot game
    }

    newSnake.unshift(head);

    if (head.x === food.x && head.y === food.y) {
      // Snake ate the food, generate new food
      generateNewFood();

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
  }, [snake, direction, food.x, food.y, score, speed]);

  const handleKeyPress = useCallback(
    (e: KeyboardEvent) => {
      const directionMap: { [key: string]: Direction } = {
        ArrowUp: Direction.UP,
        ArrowDown: Direction.DOWN,
        ArrowLeft: Direction.LEFT,
        ArrowRight: Direction.RIGHT,
      };

      if (directionMap[e.key]) {
        setDirection(directionMap[e.key]);
      }
    },
    [setDirection],
  );

  return {
    snake, direction, food, score, speed, moveSnake, handleKeyPress,
  };
};
