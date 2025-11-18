import { TeamController } from "../controllers/TeamController";
import { Database } from "../db/database";
import { TeamView } from "../views/TeamView";
import { Position } from "../models/Position";
import { Team } from "../models/Team";


describe("TeamController", () => {
  let mockDb: jest.Mocked<Database>;
  let mockView: jest.Mocked<TeamView>;
  let controller: TeamController;

  beforeEach(() => {
    mockDb = {
      addTeam: jest.fn(),
      findTeamByName: jest.fn(),
      removeTeamByName: jest.fn(),
      listAllTeams: jest.fn(),
    } as any;

    mockView = {
      displayMessage: jest.fn(),
      displayError: jest.fn(),
      displayTeam: jest.fn(),
      displayAllTeams: jest.fn(),
    } as any;

    controller = new TeamController(mockDb, mockView);
  });

  test("deve criar um time com sucesso", () => {
    mockDb.addTeam.mockReturnValue(true);

    controller.createTeam("Lakers");

    expect(mockDb.addTeam).toHaveBeenCalled();
    expect(mockView.displayMessage).toHaveBeenCalled();
  });

  test("deve exibir erro ao tentar criar time duplicado", () => {
    mockDb.addTeam.mockReturnValue(false);

    controller.createTeam("Lakers");

    expect(mockView.displayError).toHaveBeenCalled();
  });

  test("deve adicionar jogador a um time existente", () => {
    const fakeTeam = new Team("Lakers");
    mockDb.findTeamByName.mockReturnValue(fakeTeam);

    controller.addPlayerToTeam("Lakers", {
      name: "Lebron",
      age: 40,
      number: 23,
      position: Position.SF,
    });

    expect(fakeTeam.getPlayers().length).toBe(1);
    expect(mockView.displayMessage).toHaveBeenCalled();
  });
});
