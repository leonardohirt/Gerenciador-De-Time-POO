import { Player } from "./Player";
import { Coach } from "./Coach";

export class Team {
  private players: Player[] = [];
  private coach?: Coach;

  constructor(public name: string) {}

  addPlayer(player: Player): void {
    this.players.push(player);
  }

  setCoach(coach: Coach): void {
    this.coach = coach;
  }

  getPlayers(): Player[] {
    return this.players;
  }

  getCoach(): Coach | undefined {
    return this.coach;
  }

  getName(): string {
    return this.name;
  }
}
