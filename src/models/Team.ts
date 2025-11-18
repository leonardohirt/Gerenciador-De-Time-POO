import { Player } from "./Player";
import { Coach } from "./Coach";
import { Showable } from "./interfaces/Showable";

import { DuplicatePlayerError } from "../errors/DuplicatePlayerError";
import { PlayerNotFoundError } from "../errors/PlayerNotFoundError";
import { CoachAlreadyAssignedError } from "../errors/CoachAlreadyAssignedError";

export class Team implements Showable {
  private players: Player[] = [];
  private coach?: Coach;

  constructor(public name: string) {}

  public addPlayer(player: Player): void {
    const jaExiste = this.players.some(p => p.id === player.id);

    if (jaExiste) {
      throw new DuplicatePlayerError(player.id);
    }

    this.players.push(player);
  }

  public removePlayerById(playerId: number): boolean {
    const index = this.players.findIndex(p => p.id === playerId);

    if (index === -1) {
      throw new PlayerNotFoundError(playerId);
    }

    this.players.splice(index, 1);
    return true;
  }

  public setCoach(coach: Coach): void {
    if (this.coach) {
      throw new CoachAlreadyAssignedError(this.name);
    }

    this.coach = coach;
  }

  public getPlayers(): Player[] {
    return [...this.players];
  }

  public getCoach(): Coach | undefined {
    return this.coach;
  }

  public showInfo(): void {
    console.log(`\n======= TIME: ${this.name.toUpperCase()} =======`);

    // Coach
    console.log("\n--- Técnico ---");
    if (this.coach) {
      this.coach.showInfo();
    } else {
      console.log("(Não definido)");
    }

    // Players
    console.log("\n--- Jogadores ---");
    if (this.players.length === 0) {
      console.log("(Nenhum jogador no time)");
    } else {
      this.players.forEach(p => p.showInfo());
    }

    console.log("======================================\n");
  }
}
