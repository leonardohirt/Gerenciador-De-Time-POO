import { TeamController } from "./controllers/TeamController";
import { Position } from "./models/Position";

const controller = new TeamController();

controller.createTeam("Los Angeles Lakers");
controller.addPlayer("LeBron James", 23, Position.ALA);
controller.addPlayer("Luka Dončić", 77, Position.ARMADOR);
controller.setCoach("JJ Redick", 1);

controller.createTeam("Dallas Mavericks");
controller.addPlayer("Kyrie Irving", 2, Position.ALA_ARMADOR);
controller.addPlayer("Anthony Davis", 3, Position.ALA_PIVO);
controller.setCoach("Jason Kidd", 3);

controller.showTeam();

controller.listAllTeams();
