import { Player } from "./Player";
import { Coach } from "./Coach";

export class Team {
  private players: Player[] = [];
  private coach?: Coach;

  constructor(public name: string) {}

  addPlayer(player: Player): void {
    if (this.players.find(p => p.name === player.name)) {
      console.log(`Jogador "${player.name}" já está no time.\n`);
      return;
    }
    this.players.push(player);
    console.log(`Jogador "${player.name}" adicionado ao time "${this.name}".\n`);
  }

  setCoach(coach: Coach): void {
    this.coach = coach;
    console.log(`Técnico "${coach.name}" definido para o time "${this.name}".\n`);
  }

  getJogadores(): Player[] {
    return this.players;
  }

  getTecnico(): Coach | undefined {
    return this.coach;
  }

  getNome(): string {
    return this.name;
  }
}
