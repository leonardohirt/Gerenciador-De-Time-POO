import { Team } from "../models/Team";
import { Player } from "../models/Player";
import { Coach } from "../models/Coach";

export class Database {
  private teams: Team[] = [];

  addTeam(team: Team): void {
    this.teams.push(team);
  }

  getTeamByName(name: string): Team | undefined {
    return this.teams.find(team => team.name === name);
  }

  addPlayerToTeam(teamName: string, player: Player): void {
    const team = this.getTeamByName(teamName);
    if (team) {
      team.addPlayer(player);
    } else {
      console.log(`Time "${teamName}" não encontrado!`);
    }
  }

  setCoachToTeam(teamName: string, coach: Coach): void {
    const team = this.getTeamByName(teamName);
    if (team) {
      team.setCoach(coach);
    } else {
      console.log(`Time "${teamName}" não encontrado!`);
    }
  }

  listTeams(): Team[] {
    return this.teams;
  }
}
