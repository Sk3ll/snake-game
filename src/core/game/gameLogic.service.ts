'use server';

import type { Socket } from 'socket.io';
import { clearInterval } from 'timers';
import { SnakeService } from './snake/snake.service';
import { FoodService } from './food/food.service';
import { MatchService } from './match/match.service';
import { Direction, SocketMessage } from '../../common/enums';
import {
  getSize, isCrossedCoords, isCrossedEntities, logger,
} from '../../common/utils';
import { DIRECTION_KEYS } from '../../common/constants';

export class GameLogicService {
  snakeService : SnakeService;

  foodService: FoodService;

  matchService: MatchService;

  constructor() {
    this.foodService = new FoodService();
    this.snakeService = new SnakeService();
    this.matchService = new MatchService();
  }

  initGame(socket: Socket, username: string) {
    logger.info(`Init game by ${username}`);
    const match = this.matchService.getMatch(username);
    if (match) {
      this.gameLoop(socket, match.username);
      return;
    }
    const newMatch = { username };
    const matchId = this.matchService.createMatch(newMatch);
    const snake = this.snakeService.generateNewSnake(matchId);
    const food = this.foodService.generateNewFood(snake.coords, matchId);
    const data = {
      matchId,
      snake: snake.coords,
      food: food?.coords,
      score: snake.score,
    };

    socket.emit(SocketMessage.UPDATE_GAME, data);
    this.gameLoop(socket, matchId);
  }

  gameLoop(socket: Socket, matchId: string) {
    this.snakeService.setMatchId(matchId);
    const intervalId = setInterval(() => {
      const playerSnake = this.snakeService.getSnake();
      const food = this.foodService.getFood(matchId);
      const newSnake = [...playerSnake.coords];
      const head = { ...newSnake[0] };

      const directionHandlers: { [key in Direction]: () => void } = {
        [Direction.UP]: () => (head.y = (head.y - 1 + getSize()) % (getSize())),
        [Direction.DOWN]: () => (head.y = (head.y + 1) % (getSize())),
        [Direction.LEFT]: () => (head.x = (head.x - 1 + getSize()) % (getSize())),
        [Direction.RIGHT]: () => (head.x = (head.x + 1) % (getSize())),
      };
      if (!directionHandlers[playerSnake.direction]) {
        clearInterval(intervalId);
        return;
      }
      directionHandlers[playerSnake.direction]();

      // Check handle with snake body
      if (isCrossedEntities(newSnake.slice(1), head)) {
        const data = this.onGameOver(matchId);
        socket.emit(SocketMessage.UPDATE_GAME, data);
        clearInterval(intervalId);
        this.gameLoop(socket, matchId);
        return;
      }

      newSnake.unshift(head);

      if (isCrossedCoords(head, food?.coords)) {
        // Snake ate the food, generate new food
        this.foodService.generateNewFood(newSnake, matchId);

        // Increase score
        this.snakeService.setScore(playerSnake.score + 50, matchId);

        // Increase speed every 200 points, with a maximum speed of 200
        if (playerSnake.score % 200 === 0 && playerSnake.speed > 25) {
          this.snakeService.setSpeed(playerSnake.speed - 25, matchId);
          clearInterval(intervalId);
          this.gameLoop(socket, matchId);
        }
      } else {
        // Remove the last part of the snake if it didn't eat the food
        newSnake.pop();
      }

      const snake = this.snakeService.setSnake(newSnake, matchId);
      const newFood = this.foodService.getFood(matchId);
      const data = {
        matchId,
        snake: snake.coords,
        food: newFood?.coords,
        score: snake.score,
      };

      socket.emit(SocketMessage.UPDATE_GAME, data);
    }, this.snakeService.getSpeed(matchId));

    socket.on(SocketMessage.DISCONNECT, () => {
      clearInterval(intervalId);
    });
  }

  updateDirection({ directionKey, matchId }: {directionKey: string, matchId: string}) {
    const oppositeDirection: Record<string, Direction> = {
      ArrowUp: Direction.DOWN,
      ArrowDown: Direction.UP,
      ArrowLeft: Direction.RIGHT,
      ArrowRight: Direction.LEFT,
    };

    const snake = this.snakeService.getSnake(matchId);
    if (!snake) return;
    const checkDirection = DIRECTION_KEYS[directionKey] && snake.coords.length === 1;
    const checkOppositeDirection = snake.coords.length !== 1
        && oppositeDirection[directionKey] !== snake.direction;

    if (checkDirection || checkOppositeDirection) {
      this.snakeService.setDirection(DIRECTION_KEYS[directionKey], matchId);
    }
  }

  onGameOver(matchId: string) {
    const snake = this.snakeService.generateNewSnake(matchId);
    const newFood = this.foodService.generateNewFood(snake.coords, matchId);

    return {
      matchId,
      snake: snake.coords,
      food: newFood?.coords,
      score: snake.score,
    };
  }
}
