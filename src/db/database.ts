import { Team } from "../models/Team";

export class Database {
  private readonly teams: Team[] = [];

  public addTeam(team: Team): boolean {
    if (this.findTeamByName(team.name)) {
      return false;
    }
    this.teams.push(team);
    return true;
  }

  public findTeamByName(name: string): Team | undefined {
    return this.teams.find(team => team.name === name);
  }

  public listAllTeams(): Team[] {
    return [...this.teams];
  }

  public removeTeamByName(name: string): boolean {
    const index = this.teams.findIndex(team => team.name === name);
    if (index !== -1) {
      this.teams.splice(index, 1);
      return true;
    }
    return false; 
  }
}