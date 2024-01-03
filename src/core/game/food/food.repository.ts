import { FoodEntity } from '../../../common/interfaces';

export interface FoodEn {
    matchId: string;
    coords: FoodEntity;
}

export class FoodRepository {
  foods = new Map<string, FoodEn>();

  getFood(matchId: string) {
    return this.foods.get(matchId);
  }

  setFood(food: FoodEntity, matchId: string) {
    const newFood = { coords: food, matchId };
    this.foods.set(matchId, { coords: food, matchId });
    return newFood;
  }
}
