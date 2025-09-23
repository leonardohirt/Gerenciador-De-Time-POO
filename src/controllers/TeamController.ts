import { Team } from "../models/Team";
import { Player } from "../models/Player";
import { Coach } from "../models/Coach";
import { TeamView } from "../views/TeamView";
import { Position } from "../models/Position";

export class TeamController {
  private team: Team;
  private view: TeamView;

  constructor(teamName: string) {
    this.team = new Team(teamName);
    this.view = new TeamView();
  }

  addPlayer(name: string, number: number, position: Position): void {
    const player = new Player(name, number, position);
    this.team.addPlayer(player);
  }

  setCoach(name: string, experience: number): void {
    const coach = new Coach(name, experience);
    this.team.setCoach(coach);
  }

  showTeam(): void {
    this.view.displayTeam(this.team);
  }
}
