import { TeamController } from "./controllers/TeamController";
import { Position } from "./models/Position";
import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });
const controller = new TeamController();

function mainMenu() {
  while (true) {
    console.log("\n=== Menu Principal ===");
    console.log("1. Criar time");
    console.log("2. Adicionar jogador");
    console.log("3. Remover jogador");
    console.log("4. Definir técnico");
    console.log("5. Mostrar time atual");
    console.log("6. Listar todos os times");
    console.log("7. Remover time");
    console.log("0. Sair");

    const choice = prompt("Escolha uma opção: ");

    switch (choice) {
      case "1": {
        const teamName = prompt("Nome do time: ");
        controller.createTeam(teamName);
        break;
      }

      case "2": {
        const currentTeam = controller.getTeam();
        if (!currentTeam) {
          console.log("Nenhum time criado. Crie um time primeiro.");
          break;
        }
        const playerName = prompt("Nome do jogador: ");
        const number = parseInt(prompt("Número da camisa: "));
        console.log("Escolha a posição:");
        Object.values(Position).forEach((pos, index) =>
          console.log(`${index + 1}. ${pos}`)
        );
        const posChoice = parseInt(prompt("Opção: "));
        const position = Object.values(Position)[posChoice - 1];
        if (!position) {
          console.log("Posição inválida.");
          break;
        }
        controller.addPlayer(playerName, number, position);
        break;
      }

      case "3": {
        const teamToRemovePlayer = controller.getTeam();
        if (!teamToRemovePlayer) {
          console.log("Nenhum time criado.");
          break;
        }
        const playerToRemove = prompt("Nome do jogador a remover: ");
        controller.db.removePlayerFromTeam(
          teamToRemovePlayer.getNome(),
          playerToRemove
        );
        break;
      }

      case "4": {
        const teamForCoach = controller.getTeam();
        if (!teamForCoach) {
          console.log("Nenhum time criado. Crie um time primeiro.");
          break;
        }
        const coachName = prompt("Nome do técnico: ");
        const experience = parseInt(prompt("Experiência (anos): "));
        controller.setCoach(coachName, experience);
        break;
      }

      case "5":
        controller.showTeam();
        break;

      case "6":
        controller.listAllTeams();
        break;

      case "7": {
        const removeTeamName = prompt("Nome do time a remover: ");
        controller.db.removeTeam(removeTeamName);
        break;
      }

      case "0":
        console.log("Saindo...");
        process.exit(0);

      default:
        console.log("Opção inválida.");
    }
  }
}

mainMenu();
