'use client';

import React, { useEffect, useRef } from 'react';

import { CANVAS_SIZE } from '../common/constants';
import { useGameContext } from '../hooks/useGameContext';
import { Score } from './Score';
import { Direction } from '../common/enums/direction';
import { drawEntity } from '../common/utils';
import { Color } from '../common/enums/color';
import { Button } from './Button';
import { Footer } from './Footer';

const GameManager: React.FC = () => {
  const {
    snake, food, speed, moveSnake, handleKeyPress, setDirection,
  } = useGameContext();

  const isMobile = window.navigator.userAgent.match(/iPhone|Android|iPad/i);

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
          const color: Color = index === 0 ? Color.DARKGREEN : Color.GREEN;
          drawEntity(ctx, part, color);
        });

        // Draw the food
        drawEntity(ctx, food, Color.RED);
      }
    }
  }, [snake, food]);

  // Game loop
  useEffect(() => {
    const intervalId = setInterval(() => {
      moveSnake(intervalId);
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
    <div className="flex flex-col gap-y-[1.5rem]">
      <Score />
      <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} className="outline-dashed" />

      {isMobile && (
      <div className="grid grid-cols-3 grid-rows-2 gap-4">
          {Object.values(Direction).map((direction: Direction) => (
            <Button
              key={direction}
              className={`${direction === Direction.UP ? 'col-start-2' : 'row-start-2'}`}
              onClick={() => setDirection(direction)}
            >
              {direction}
            </Button>
          ))}
      </div>
      )}
      <Footer />

    </div>
  );
};

export { GameManager };
