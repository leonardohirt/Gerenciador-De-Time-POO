import { Team } from "../models/Team";
import { Player } from "../models/Player";
import { Coach } from "../models/Coach";
import { TeamView } from "../views/TeamView";
import { Position } from "../models/Position";
import { Database } from "../db/database";

export class TeamController {
  public db: Database = new Database(); 
  private team!: Team;
  private view: TeamView;

  constructor() {
    this.view = new TeamView();
  }

  createTeam(teamName: string): void {
    this.team = new Team(teamName);
    this.db.addTeam(this.team);
  }

  addPlayer(name: string, number: number, position: Position): void {
    const player = new Player(name, number, position);
    this.team.addPlayer(player);
    this.db.addPlayerToTeam(this.team.name, player);
  }

  setCoach(name: string, experience: number): void {
    const coach = new Coach(name, experience);
    this.team.setCoach(coach);
    this.db.setCoachToTeam(this.team.name, coach);
  }

  showTeam(): void {
    this.view.displayTeam(this.team);
  }

  listAllTeams(): void {
    console.log("\n=== Times cadastrados no banco ===");
    this.db.listTeams().forEach(team => this.view.displayTeam(team));
  }

  getTeam(): Team {
    return this.team;
  }
}
