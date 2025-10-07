import { TeamController } from "./controllers/TeamController";
import { Position } from "./models/Position";
import { Player } from "./models/Player";
import { Coach } from "./models/Coach";

import promptSync from "prompt-sync";

const prompt = promptSync({ sigint: true });
const controller = new TeamController();

function timeMenu(teamName: string) {
  const team = controller.db.getTeamByName(teamName);
  if (!team) {
    console.log("Time não encontrado.");
    return;
  }

  while (true) {
    console.log(`\n=== Menu do Time: ${teamName} ===`);
    console.log("1. Adicionar jogador");
    console.log("2. Remover jogador");
    console.log("3. Definir técnico");
    console.log("4. Mostrar time");
    console.log("0. Voltar ao menu principal");

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
        const player = new Player(playerName, number, position);
        controller.db.addPlayerToTeam(teamName, player);
        console.log(`Jogador ${playerName} adicionado ao time ${teamName}.`);
        break;
      }

      case "2": {
        const playerToRemove = prompt("Nome do jogador a remover: ");
        controller.db.removePlayerFromTeam(teamName, playerToRemove);
        break;
      }

      case "3": {
        const coachName = prompt("Nome do técnico: ");
        const experience = parseInt(prompt("Experiência (anos): "));
        const coach = new Coach(coachName, experience);
        controller.db.setCoachToTeam(teamName, coach);
        console.log(`Técnico ${coachName} definido para o time ${teamName}.`);
        break;
      }

      case "4": {
        const team = controller.db.getTeamByName(teamName);
        if (team) controller.showTeam(); 
        break;
      }

      case "0":
        return; 

      default:
        console.log("Opção inválida.");
    }
  }
}

function mainMenu() {
  while (true) {
    console.log("\n=== Menu Principal ===");
    console.log("1. Criar time");
    console.log("2. Selecionar time");
    console.log("3. Listar todos os times");
    console.log("4. Remover time");
    console.log("0. Sair");

    const choice = prompt("Escolha uma opção: ");

    switch (choice) {
      case "1": {
        const teamName = prompt("Nome do time: ");
        controller.createTeam(teamName);
        console.log(`Time ${teamName} criado.`);
        break;
      }

      case "2": {
        const teamName = prompt("Nome do time que deseja selecionar: ");
        const team = controller.db.getTeamByName(teamName);
        if (!team) {
          console.log("Time não encontrado.");
          break;
        }
        timeMenu(teamName);
        break;
      }

      case "3":
        controller.listAllTeams();
        break;

      case "4": {
        const removeTeamName = prompt("Nome do time a remover: ");
        controller.db.removeTeam(removeTeamName);
        console.log(`Time ${removeTeamName} removido.`);
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
