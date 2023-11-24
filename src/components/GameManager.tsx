import React, { useEffect, useRef } from 'react';
import { CANVAS_SIZE, CELL_SIZE } from '../common/constants';
import { useGameContext } from '../hooks/useGameContext';
import { Score } from './Score';
import { Direction } from '../common/enums/direction.ts';

const GameManager: React.FC = () => {
  const {
    snake, food, speed, moveSnake, handleKeyPress, setDirection,
  } = useGameContext();
  const isMobile = navigator.userAgent.match(/iPhone/i);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (ctx) {
        // Clear the canvas
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        // Draw the snake
        snake.forEach((part, index) => {
          ctx.fillStyle = index === 0 ? 'darkgreen' : 'green';
          ctx.fillRect(part.x * CELL_SIZE + 1, part.y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
        });

        // Draw the food
        ctx.fillStyle = 'red';
        ctx.fillRect(food.x * CELL_SIZE + 1, food.y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
      }
    }
  }, [snake, food]);

  // Game loop
  useEffect(() => {
    const intervalId = setInterval(() => {
      moveSnake();
    }, speed);

    return () => {
      clearInterval(intervalId);
    };
  }, [moveSnake, speed]);

  // Snake controls
  useEffect(() => {
    window.addEventListener('keydown', handleKeyPress);
    return () => {
      window.removeEventListener('keydown', handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <div className="flex flex-col gap-y-[5rem]">
      <Score />
      <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} className="outline-dashed" />

      {isMobile && (
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
        <button className="col-start-2 outline-dashed" type="button" onClick={() => setDirection(Direction.UP)}>Up</button>
        <button className="row-start-2 outline-dashed" type="button" onClick={() => setDirection(Direction.LEFT)}>Left</button>
        <button className="row-start-2 outline-dashed" type="button" onClick={() => setDirection(Direction.DOWN)}>DOWN</button>
        <button className="row-start-2 outline-dashed" type="button" onClick={() => setDirection(Direction.RIGHT)}>Right</button>
      </div>
      )}

    </div>
  );
};

export { GameManager };
