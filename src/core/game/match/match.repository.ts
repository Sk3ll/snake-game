// import { FoodEntity, SnakeEntity } from '../../../common/interfaces';

export interface MatchEntity {
    username: string;
}

export class MatchRepository {
  private matches = new Map<string, MatchEntity>();

  getMatchByUserName(username: string) {
    return this.matches.get(username);
  }

  createMatch(match: MatchEntity) {
    this.matches.set(match.username, match);
  }
}
