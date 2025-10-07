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
    console.log(`Time "${teamName}" criado com sucesso.\n`);
  }

  addPlayer(name: string, number: number, position: Position): void {
    if (!this.team) {
      console.log("Nenhum time criado. Crie um time primeiro.\n");
      return;
    }

    const player = new Player(name, number, position);
    this.team.addPlayer(player);
    this.db.addPlayerToTeam(this.team.name, player);
    console.log(`Jogador "${name}" adicionado ao time "${this.team.name}".\n`);
  }

  setCoach(name: string, experience: number): void {
    if (!this.team) {
      console.log("Nenhum time criado. Crie um time primeiro.\n");
      return;
    }

    const coach = new Coach(name, experience);
    this.team.setCoach(coach);
    this.db.setCoachToTeam(this.team.name, coach);
    console.log(`Técnico "${name}" definido para o time "${this.team.name}".\n`);
  }

  showTeam(): void {
    if (!this.team) {
      console.log("Nenhum time criado. Crie um time primeiro.\n");
      return;
    }

    console.log("\n=== Detalhes do Time Atual ===");
    this.view.displayTeam(this.team);
    console.log("---------------------------\n");
  }

  listAllTeams(): void {
    const teams = this.db.listTeams();

    if (teams.length === 0) {
      console.log("\nNenhum time cadastrado ainda.\n");
      return;
    }

    console.log("\n=== Times cadastrados no banco ===");
    teams.forEach(team => {
      this.view.displayTeam(team);
      console.log("---------------------------");
    });
    console.log("");
  }

  getTeam(): Team {
    return this.team;
  }
}
