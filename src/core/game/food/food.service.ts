import { SnakeEntity, FoodEntity } from '../../../common/interfaces';
import { isCrossedEntities, randomPosition } from '../../../common/utils';
import { FoodRepository } from './food.repository';

export class FoodService {
  private readonly foodRepository: FoodRepository;

  constructor() {
    this.foodRepository = new FoodRepository();
  }

  getFood(matchId: string) {
    // return this.foodRepository.getFood(matchId);
    return this.foodRepository.food;
  }

  generateNewFood(snakeEntity: SnakeEntity[], matchId: string) {
    let newFood: FoodEntity;
    do {
      newFood = {
        x: randomPosition(),
        y: randomPosition(),
      };
    } while (isCrossedEntities(snakeEntity, newFood));

    return this.foodRepository.setFood(newFood);
  }
}
