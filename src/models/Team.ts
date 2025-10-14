import { Player } from "./Player";
import { Coach } from "./Coach";
import { Showable } from "./interfaces/Showable";

export class Team implements Showable {
  private readonly players: Player[] = [];
  private coach?: Coach;

  constructor(public name: string) {}

  public addPlayer(player: Player): void {
    if (this.players.some(p => p.id === player.id)) {
      console.error(`ERRO: Jogador com ID ${player.id} (${player.name}) já está no time.\n`);
      return;
    }
    this.players.push(player);
    console.log(`Jogador "${player.name}" adicionado ao time "${this.name}".\n`);
  }

  public setCoach(coach: Coach): void {
    this.coach = coach;
    console.log(`Técnico "${coach.name}" definido para o time "${this.name}".\n`);
  }

public removePlayerById(playerId: number): boolean {
  const index = this.players.findIndex(p => p.id === playerId);

  if (index !== -1) {
    const playerToRemove = this.players[index];

    if (playerToRemove) { 
      this.players.splice(index, 1);
      console.log(`Jogador "${playerToRemove.name}" removido do time "${this.name}".\n`);
      return true;
    }
  }

  return false;
}

 public getPlayers(): Player[] {
    return [...this.players];
  }

  public getCoach(): Coach | undefined {
    return this.coach;
  }

  public showInfo(): void {
    console.log(`\n============== TIME: ${this.name.toUpperCase()} ==============`);

    if (this.coach) {
      console.log(`\n--- Técnico ---`);
      this.coach.showInfo();
    } else {
      console.log("\n--- Técnico ---\n(Não definido)");
    }

    console.log("\n--- Elenco de Jogadores ---");
    if (this.players.length === 0) {
      console.log("(Nenhum jogador no time)");
    } else {
      this.players.forEach(player => player.showInfo());
    }
    console.log(`=================================================\n`);
  }
}