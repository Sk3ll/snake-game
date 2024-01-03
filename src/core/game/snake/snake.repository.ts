import { SnakeEntity } from '../../../common/interfaces';
import { Direction } from '../../../common/enums';
import { randomDirection, randomPosition } from '../../../common/utils';

const defaultSpeed = 250;
const defaultScore = 0;

export interface PlayerDto {
    matchId: string;
}

export interface SnakeEn {
    matchId: string;
    coords: SnakeEntity[];
    direction: Direction;
    speed: number;
    score: number;
}

export class SnakeRepository {
  snakes = new Map<string, SnakeEn>();

  getSnake({ matchId }: PlayerDto) {
    return this.snakes.get(matchId);
  }

  setSnake(newSnake: SnakeEntity[], { matchId }: PlayerDto) {
    return this.setEntity({
      matchId, coords: newSnake,
    });
  }

  generateNewSnake({ matchId }: PlayerDto) {
    return this.setEntity({
      matchId,
      speed: defaultSpeed,
      score: defaultScore,
      direction: randomDirection(),
      coords: [{
        x: randomPosition(),
        y: randomPosition(),
      }],
    });
  }

  setDirection(direction: Direction, { matchId }: PlayerDto) {
    const snake = this.setEntity({ matchId, direction });
    return snake.direction;
  }

  setSpeed(speed: number, { matchId }: PlayerDto) {
    const snake = this.setEntity({ matchId, speed });
    return snake.speed;
  }

  setScore(score: number, { matchId }: PlayerDto) {
    const snake = this.setEntity({ matchId, score });
    return snake.score;
  }

  private setEntity(en: Partial<SnakeEn>) {
    const existedSnake = this.snakes.get(en.matchId);
    const generatedSnake: SnakeEn = existedSnake ? { ...existedSnake, ...en } : {
      matchId: en.matchId,
      coords: en.coords || [],
      direction: randomDirection(),
      speed: defaultSpeed,
      score: defaultScore,
    };
    this.snakes.set(en.matchId, generatedSnake);
    return generatedSnake;
  }
}
