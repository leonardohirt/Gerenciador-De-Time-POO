import { Team } from "../models/Team";

export class TeamView {
  displayTeam(team: Team): void {
    console.log(`\nTime: ${team.getNome()}`);

    const coach = team.getTecnico();
    if (coach) {
      coach.showInfo();
    } else {
      console.log("Nenhum técnico definido.");
    }

    const players = team.getJogadores();
    if (players.length === 0) {
      console.log("Nenhum jogador no time.");
    } else {
      console.log("Jogadores:");
      players.forEach(player => player.showInfo());
    }
  }

  displayPlayers(players: ReturnType<Team["getJogadores"]>): void {
    if (players.length === 0) {
      console.log("Nenhum jogador para exibir.");
    } else {
      console.log("\nJogadores:");
      players.forEach(player => player.showInfo());
    }
  }

  displayCoach(coach: ReturnType<Team["getTecnico"]>): void {
    if (coach) {
      console.log("\nTécnico:");
      coach.showInfo();
    } else {
      console.log("Nenhum técnico para exibir.");
    }
  }
}
