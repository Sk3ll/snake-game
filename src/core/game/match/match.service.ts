import { MatchRepository } from './match.repository';

export class MatchService {
  private readonly matchRepository: MatchRepository;

  constructor() {
    this.matchRepository = new MatchRepository();
  }

  getMatch(username: string) {
    return this.matchRepository.getMatchByUserName(username);
  }

  createMatch(dto: { username: string }) {
    if (this.matchRepository.getMatchByUserName(dto.username)) {
      throw new Error('This username exists');
    }
    this.matchRepository.createMatch(dto);
    return dto.username; // matchId
  }
}
