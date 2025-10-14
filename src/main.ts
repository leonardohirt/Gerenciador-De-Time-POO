import { TeamController } from "./controllers/TeamController";
import { Position } from "./models/Position";
import { Database } from "./db/database";
import { TeamView } from "./views/TeamView";
import promptSync from "prompt-sync";


const prompt = promptSync({ sigint: true });

const db = new Database();
const view = new TeamView();
const controller = new TeamController(db, view);

function timeMenu(teamName: string) {
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
        const name = prompt("Nome do jogador: ");
        const age = parseInt(prompt("Idade do jogador: "), 10);
        const number = parseInt(prompt("Número da camisa: "), 10);

        console.log("Escolha a posição:");
        const posicoes = Object.values(Position);
        posicoes.forEach((pos, index) => console.log(`${index + 1}. ${pos}`));
        const posChoice = parseInt(prompt("Opção: "), 10) - 1;
        
        if (posChoice < 0 || posChoice >= posicoes.length || isNaN(age) || isNaN(number)) {
          view.displayError("Dados inválidos. Tente novamente.");
          break;
        }
        

        const position = posicoes[posChoice] as Position;

        controller.addPlayerToTeam(teamName, { name, age, number, position });
        break;
      }
      
      case "2": { 
        const playerId = parseInt(prompt("ID do jogador a remover: "), 10);
        if (isNaN(playerId)) {
          view.displayError("ID inválido.");
          break;
        }
        controller.removePlayerFromTeam(teamName, playerId);
        break;
      }

      case "3": { 
        const name = prompt("Nome do técnico: ");
        const age = parseInt(prompt("Idade do técnico: "), 10);
        const experience = parseInt(prompt("Anos de experiência: "), 10);

        if (isNaN(age) || isNaN(experience)) {
          view.displayError("Dados inválidos. Tente novamente.");
          break;
        }

        controller.setCoachToTeam(teamName, { name, age, experience });
        break;
      }

      case "4": { 
        controller.showTeamByName(teamName);
        break;
      }

      case "0":
        return;

      default:
        view.displayError("Opção inválida.");
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
        break;
      }

      case "2": {
        const teamName = prompt("Nome do time para gerenciar: ");
        if (db.findTeamByName(teamName)) {
          timeMenu(teamName);
        } else {
          view.displayError("Time não encontrado.");
        }
        break;
      }

      case "3": {
        controller.listAllTeams();
        break;
      }

      case "4": {
        const teamName = prompt("Nome do time a remover: ");
        controller.removeTeamByName(teamName);
        break;
      }

      case "0":
        console.log("Saindo do sistema...");
        return;

      default:
        view.displayError("Opção inválida.");
    }
  }
}

mainMenu();