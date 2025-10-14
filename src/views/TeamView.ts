import { Team } from "../models/Team";

export class TeamView {

  public displayTeam(team: Team): void {
    team.showInfo();
  }

  public displayAllTeams(teams: Team[]): void {
    if (teams.length === 0) {
      this.displayMessage("\nNenhum time cadastrado ainda.\n");
      return;
    }

    console.log("\n============== TIMES CADASTRADOS ==============");
    teams.forEach(team => team.showInfo());
  }

  public displayMessage(message: string): void {
    console.log(message);
  }

  public displayError(message: string): void {
 
    console.error(`❌ ERRO: ${message}\n`);
  }
}