import { Player } from "./Player";
import { Coach } from "./Coach";
import { Showable } from "./interfaces/Showable";

export class Team implements Showable {
  private players: Player[] = [];
  private coach?: Coach; 

  constructor(public name: string) {}

  public addPlayer(player: Player): void {

    const jaExiste = this.players.some(p => p.id === player.id);
    if (jaExiste) {
      console.error(`ERRO: Jogador com ID ${player.id} (${player.name}) já está no time.`);
      return; 
    }

    this.players.push(player);
    console.log(` Jogador "${player.name}" adicionado ao time "${this.name}".`);
  }

public removePlayerById(playerId: number): void {
    const index = this.players.findIndex(p => p.id === playerId);

    if (index === -1) {
      console.error(`ERRO: Nenhum jogador encontrado com o ID ${playerId}.`);
      return; 
    }

    const removido = this.players[index];

    if (!removido) {
      console.error(`ERRO: Falha ao tentar obter jogador com ID ${playerId}.`);
      return;
    }

    this.players.splice(index, 1);
    
    console.log(`Jogador removido do time "${this.name}":`);
    removido.showInfo(); 
  }

  public setCoach(coach: Coach): void {
    this.coach = coach;
    console.log(` Técnico "${coach.name}" definido para o time "${this.name}".`);
  }


  public getPlayers(): Player[] {
    return [...this.players]; 
  }

  public getCoach(): Coach | undefined {
    return this.coach;
  }

  public showInfo(): void {
    console.log(`\n======= TIME: ${this.name.toUpperCase()} =======`);

    if (this.coach) {
      console.log("\n--- Técnico ---");
      this.coach.showInfo();
    } else {
      console.log("\n--- Técnico ---\n(Não definido)");
    }

    console.log("\n--- Jogadores ---");
    if (this.players.length === 0) {
      console.log("(Nenhum jogador no time)");
    } else {
  
      this.players.forEach(p => p.showInfo());
    }

    console.log("======================================\n");
  }
}