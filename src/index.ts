import { TeamController } from "./controllers/TeamController";
import { Position } from "./models/Position";

const controller = new TeamController("Los Angeles Lakers");

controller.addPlayer("LeBron James", 23, Position.ALA);
controller.addPlayer("Luka Dončić", 77, Position.ARMADOR);
controller.setCoach("JJ Redick", 1);

controller.showTeam();
