import { Team } from "../models/Team";
import { Player } from "../models/Player";
import { Coach } from "../models/Coach";

export class Database {
  private teams: Team[] = [];

  addTeam(team: Team): void {
    const existingTeam = this.getTeamByName(team.getNome());
    if (existingTeam) {
      console.log(`O time "${team.getNome()}" já está cadastrado.\n`);
      return;
    }
    this.teams.push(team);
  }

  getTeamByName(name: string): Team | undefined {
    return this.teams.find(team => team.getNome() === name);
  }

  addPlayerToTeam(teamName: string, player: Player): void {
    const team = this.getTeamByName(teamName);
    if (team) {
      team.addPlayer(player);
    } else {
      console.log(`Time "${teamName}" não encontrado.\n`);
    }
  }

  setCoachToTeam(teamName: string, coach: Coach): void {
    const team = this.getTeamByName(teamName);
    if (team) {
      team.setCoach(coach);
    } else {
      console.log(`Time "${teamName}" não encontrado.\n`);
    }
  }

  listTeams(): Team[] {
    return this.teams;
  }

  removeTeam(teamName: string): void {
    const index = this.teams.findIndex(t => t.getNome() === teamName);
    if (index !== -1) {
      this.teams.splice(index, 1);
      console.log(`Time "${teamName}" removido com sucesso.\n`);
    } else {
      console.log(`Time "${teamName}" não encontrado.\n`);
    }
  }

  removePlayerFromTeam(teamName: string, playerName: string): void {
    const team = this.getTeamByName(teamName);
    if (!team) {
      console.log(`Time "${teamName}" não encontrado.\n`);
      return;
    }

    const players = team.getJogadores();
    const playerIndex = players.findIndex(p => p.name === playerName);

    if (playerIndex !== -1) {
      players.splice(playerIndex, 1);
      console.log(`Jogador "${playerName}" removido do time "${teamName}".\n`);
    } else {
      console.log(`Jogador "${playerName}" não encontrado no time "${teamName}".\n`);
    }
  }
}
