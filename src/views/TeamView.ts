import { Team } from "../models/Team";

export class TeamView {
  displayTeam(team: Team): void {
    console.log(`\n Team: ${team.getName()}`);

    if (team.getCoach()) {
      team.getCoach()!.showInfo();
    } else {
      console.log("No coach defined.");
    }

    if (team.getPlayers().length === 0) {
      console.log("No players in the team.");
    } else {
      console.log("Players:");
      team.getPlayers().forEach(player => player.showInfo());
    }
  }

  displayPlayers(players: ReturnType<Team["getPlayers"]>): void {
    if (players.length === 0) {
      console.log("No players to display.");
    } else {
      console.log("\n Players:");
      players.forEach(player => player.showInfo());
    }
  }

  displayCoach(coach: ReturnType<Team["getCoach"]>): void {
    if (coach) {
      console.log("\n Coach:");
      coach.showInfo();
    } else {
      console.log("No coach to display.");
    }
  }
}
