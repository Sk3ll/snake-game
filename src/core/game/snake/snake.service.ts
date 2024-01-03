import { SnakeRepository } from './snake.repository';
import { SnakeEntity } from '../../../common/interfaces';
import { Direction } from '../../../common/enums';

export class SnakeService {
  snakeRepository: SnakeRepository;

  matchId = null;

  constructor() {
    this.snakeRepository = new SnakeRepository();
  }

  setMatchId(matchId: string = this.matchId) {
    this.matchId = matchId;
  }

  getSpeed(matchId: string = this.matchId) {
    return this.getSnake(matchId).speed;
  }

  getSnake(matchId: string = this.matchId) {
    return this.snakeRepository.getSnake({ matchId });
  }

  generateNewSnake(matchId: string = this.matchId) {
    return this.snakeRepository.generateNewSnake({ matchId });
  }

  setSnake(snake: SnakeEntity[], matchId: string = this.matchId) {
    return this.snakeRepository.setSnake(snake, { matchId });
  }

  setSpeed(speed: number, matchId: string = this.matchId) {
    this.snakeRepository.setSpeed(speed, { matchId });
    return this;
  }

  setDirection(direction: Direction, matchId: string = this.matchId) {
    this.snakeRepository.setDirection(direction, { matchId });
    return this;
  }

  setScore(score: number, matchId: string = this.matchId) {
    this.snakeRepository.setScore(score, { matchId });
    return this;
  }
}
