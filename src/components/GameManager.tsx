'use client';

import React, { useEffect, useRef } from 'react';

import { CANVAS_SIZE, KEYDOWN_EVENT } from '../common/constants';
import { useGameContext } from '../hooks/useGameContext';
import { Score } from './Score';
import { Color } from '../common/enums';
import { drawEntity } from '../common/utils';
import { Button } from './Button';
import { useSocketListeners } from '../hooks/useSocketListeners';
import { MobileButtons } from './MobileButtons';

const GameManager: React.FC = () => {
  useSocketListeners();
  const {
    player,
    food,
    handleKeyPress,
    onBackClick,
  } = useGameContext();

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      const ctx = canvas.getContext('2d');

      if (ctx && food && player?.snake.length) {
        // Clear the canvas
        ctx.clearRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);

        // Draw the snake
        player.snake.forEach((part, index) => {
          const color: Color = index === 0 ? Color.DARKGREEN : Color.GREEN;
          drawEntity(ctx, part, color);
        });

        // Draw the food
        drawEntity(ctx, food, Color.RED);
      }
    }
  }, [player, food]);

  // Snake controls
  useEffect(() => {
    window.addEventListener(KEYDOWN_EVENT, handleKeyPress);
    return () => {
      window.removeEventListener(KEYDOWN_EVENT, handleKeyPress);
    };
  }, [handleKeyPress]);

  return (
    <>
      <Score />
      <canvas ref={canvasRef} width={CANVAS_SIZE} height={CANVAS_SIZE} className="outline-dashed" />

      <MobileButtons />
      <div>
        <Button className="px-[2.2rem]" onClick={onBackClick}>
          Back to menu
        </Button>
      </div>
    </>
  );
};

export { GameManager };
