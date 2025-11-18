import { Team } from "../models/Team";
import { Player } from "../models/Player";
import { Coach } from "../models/Coach";
import { TeamView } from "../views/TeamView";
import { Position } from "../models/Position";
import { Database } from "../db/database";

import { TeamNotFoundError } from "../errors/TeamNotFoundError";
import { PlayerNotFoundError } from "../errors/PlayerNotFoundError";

export class TeamController {
  private readonly db: Database;
  private readonly view: TeamView;
  private nextId = 1;

  constructor(database: Database, view: TeamView) {
    this.db = database;
    this.view = view;
  }

  public createTeam(teamName: string): void {
    try {
      const newTeam = new Team(teamName);
      const success = this.db.addTeam(newTeam);

      if (!success) {
        throw new Error(`Time "${teamName}" já existe.`);
      }

      this.view.displayMessage(`Time "${teamName}" criado com sucesso.\n`);
    } catch (err) {
      this.view.displayError((err as Error).message);
    }
  }

  public addPlayerToTeam(
    teamName: string,
    playerData: { name: string; age: number; number: number; position: Position }
  ): void {
    try {
      const team = this.db.findTeamByName(teamName);
      if (!team) {
        throw new TeamNotFoundError(teamName);
      }

      const player = new Player(
        this.nextId++,
        playerData.name,
        playerData.age,
        playerData.number,
        playerData.position
      );

      team.addPlayer(player);
      this.view.displayMessage(`Jogador "${playerData.name}" adicionado ao time "${teamName}".`);
    } catch (err) {
      this.view.displayError((err as Error).message);
    }
  }

  public setCoachToTeam(
    teamName: string,
    coachData: { name: string; age: number; experience: number }
  ): void {
    try {
      const team = this.db.findTeamByName(teamName);
      if (!team) {
        throw new TeamNotFoundError(teamName);
      }

      const coach = new Coach(
        this.nextId++,
        coachData.name,
        coachData.age,
        coachData.experience
      );

      team.setCoach(coach);
      this.view.displayMessage(`Coach "${coachData.name}" atribuído ao time "${teamName}".`);

    } catch (err) {
      this.view.displayError((err as Error).message);
    }
  }

  public removeTeamByName(teamName: string): void {
    try {
      const success = this.db.removeTeamByName(teamName);

      if (!success) {
        throw new TeamNotFoundError(teamName);
      }

      this.view.displayMessage(`Time "${teamName}" removido com sucesso.\n`);
    } catch (err) {
      this.view.displayError((err as Error).message);
    }
  }

  public removePlayerFromTeam(teamName: string, playerId: number): void {
    try {
      const team = this.db.findTeamByName(teamName);

      if (!team) {
        throw new TeamNotFoundError(teamName);
      }

      const removed = team.removePlayerById(playerId);

      if (!removed) {
        throw new PlayerNotFoundError(playerId);
      }

      this.view.displayMessage(`Jogador removido com sucesso.`);

    } catch (err) {
      this.view.displayError((err as Error).message);
    }
  }

  public showTeamByName(teamName: string): void {
    try {
      const team = this.db.findTeamByName(teamName);

      if (!team) {
        throw new TeamNotFoundError(teamName);
      }

      this.view.displayTeam(team);

    } catch (err) {
      this.view.displayError((err as Error).message);
    }
  }

  public listAllTeams(): void {
    try {
      const teams = this.db.listAllTeams();
      this.view.displayAllTeams(teams);
    } catch (err) {
      this.view.displayError((err as Error).message);
    }
  }
}
