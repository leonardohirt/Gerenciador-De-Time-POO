import { Team } from "../models/Team";
import { Player } from "../models/Player";
import { Position } from "../models/Position";

describe("Team class", () => {

  test("deve adicionar 1 jogador ao time", () => {
    const team = new Team("Lakers");
    const player = new Player(1, "Kobe", 41, 24, Position.SG);

    team.addPlayer(player);

    const players = team.getPlayers();

    expect(players.length).toBe(1);
    expect(players[0]!.name).toBe("Kobe");
  });

  test("não deve permitir jogador duplicado", () => {
    const team = new Team("Lakers");

    const p1 = new Player(1, "Kobe", 41, 24, Position.SG);
    const p2 = new Player(1, "Outro Cara", 30, 10, Position.PG);

    team.addPlayer(p1);

    expect(() => team.addPlayer(p2)).toThrow();
    expect(team.getPlayers().length).toBe(1);
  });

});
