import { Team } from "../models/Team";
import { Player } from "../models/Player";
import { Coach } from "../models/Coach";
import { TeamView } from "../views/TeamView";
import { Position } from "../models/Position";
import { Database } from "../db/database";

export class TeamController {
  private readonly db: Database;
  private readonly view: TeamView;
  private nextId = 1; 

  constructor(database: Database, view: TeamView) {
    this.db = database;
    this.view = view;
  }

  public createTeam(teamName: string): void {
    const newTeam = new Team(teamName);
    const success = this.db.addTeam(newTeam); 

    if (success) { 
      this.view.displayMessage(`Time "${teamName}" criado com sucesso.\n`);
    } else { 
      this.view.displayError(`Time "${teamName}" já existe.`);
    }
  }

  public addPlayerToTeam(teamName: string, playerData: { name: string; age: number; number: number; position: Position }): void {
    const team = this.db.findTeamByName(teamName);
    if (!team) {
      this.view.displayError(`Time "${teamName}" não encontrado.`);
      return;
    }

    const player = new Player(
      this.nextId++,
      playerData.name,
      playerData.age,
      playerData.number,
      playerData.position
    );
    team.addPlayer(player); 
  }

  public setCoachToTeam(teamName: string, coachData: { name: string; age: number; experience: number }): void {
    const team = this.db.findTeamByName(teamName);
    if (!team) {
      this.view.displayError(`Time "${teamName}" não encontrado.`);
      return;
    }

    const coach = new Coach(
      this.nextId++,
      coachData.name,
      coachData.age,
      coachData.experience
    );
    team.setCoach(coach);
  }

  public removeTeamByName(teamName: string): void {
    const success = this.db.removeTeamByName(teamName);
    if (success) {
      this.view.displayMessage(`Time "${teamName}" removido com sucesso.\n`);
    } else {
      this.view.displayError(`Time "${teamName}" não encontrado.`);
    }
  }

  public removePlayerFromTeam(teamName: string, playerId: number): void {
    const team = this.db.findTeamByName(teamName);
    if (!team) {
      this.view.displayError(`Time "${teamName}" não encontrado.`);
      return;
    }

    team.removePlayerById(playerId);
  }

  public showTeamByName(teamName: string): void {
    const team = this.db.findTeamByName(teamName);
    if (!team) {
      this.view.displayError(`Time "${teamName}" não encontrado.`);
      return;
    }
    this.view.displayTeam(team);
  }

  public listAllTeams(): void {
    const teams = this.db.listAllTeams();
    this.view.displayAllTeams(teams); 
  }
}