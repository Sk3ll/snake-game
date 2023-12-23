import type { BaseEntity } from '../interfaces';
import { Color } from '../enums';
import { CELL_SIZE } from '../constants';

export const drawEntity = (ctx: CanvasRenderingContext2D, entity: BaseEntity, color: Color) => {
  ctx.fillStyle = color;
  ctx.fillRect(entity.x * CELL_SIZE + 1, entity.y * CELL_SIZE + 1, CELL_SIZE - 2, CELL_SIZE - 2);
};
