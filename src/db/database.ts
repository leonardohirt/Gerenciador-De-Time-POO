import { Repository } from "../Repository/Repository";
import { Team } from "../models/Team";

export class Database {
  private teams = new Repository<Team>();

  public addTeam(team: Team): boolean {
    const exists = this.teams.find(t => t.name === team.name);

    if (exists) return false;

    this.teams.add(team);
    return true;
  }

  public findTeamByName(name: string): Team | undefined {
    return this.teams.find(t => t.name === name);
  }

  public listAllTeams(): Team[] {
    return this.teams.getAll();
  }

  public removeTeamByName(name: string): boolean {
    return this.teams.remove(t => t.name === name);
  }
}
